const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const API = process.env.API_URL + '/eleves';

exports.index = async (req, res) => {
    try {
        const search = req.query.search || '';
        const response = await axios.get(API);
        let eleves = response.data;

        if (search) {
            const s = search.toLowerCase();
            eleves = eleves.filter(e =>
                e.nom.toLowerCase().includes(s) ||
                e.prenom.toLowerCase().includes(s)
            );
        }

        res.render('eleves/index', { eleves, search, erreur: null });
    } catch (err) {
        res.render('eleves/index', { eleves: [], search: '', erreur: "Impossible de contacter l'API." });
    }
};

exports.show = async (req, res) => {
    try {
        const eleveResp = await axios.get(`${API}/${req.params.id}`);

        let moyennes = [];
        try {
            const moyennesResp = await axios.get(`http://localhost:3000/eleves/${req.params.id}/moyennes`);
            moyennes = moyennesResp.data;
        } catch (err) { moyennes = []; }

        let options = [];
        try {
            const optionsResp = await axios.get(`http://localhost:3000/eleves/${req.params.id}/options`);
            options = optionsResp.data;
        } catch (err) { options = []; }

        let toutesOptions = [];
        try {
            const toutesResp = await axios.get('http://localhost:3000/options');
            toutesOptions = toutesResp.data;
        } catch (err) { toutesOptions = []; }

        let projets = [];
        try {
            const projetsResp = await axios.get(`http://localhost:3000/projets/eleve/${req.params.id}`);
            projets = projetsResp.data;
        } catch (err) { projets = []; }

        let tousLesProjets = [];
        try {
            const tousResp = await axios.get('http://localhost:3000/projets');
            tousLesProjets = tousResp.data;
        } catch (err) { tousLesProjets = []; }

        res.render('eleves/show', {
            eleve: eleveResp.data,
            moyennes,
            options,
            toutesOptions,
            projets,
            tousLesProjets
        });
    } catch (err) {
        res.redirect('/eleves');
    }
};

exports.create = (req, res) => {
    res.render('eleves/create', { erreur: null });
};

exports.store = async (req, res) => {
    try {
        await axios.post(API, req.body);
        res.redirect('/eleves');
    } catch (err) {
        const erreur = err.response?.data?.error || 'Erreur lors de la création.';
        res.render('eleves/create', { erreur });
    }
};

exports.edit = async (req, res) => {
    try {
        const response = await axios.get(`${API}/${req.params.id}`);
        res.render('eleves/edit', { eleve: response.data, erreur: null });
    } catch (err) {
        res.redirect('/eleves');
    }
};

exports.update = async (req, res) => {
    try {
        await axios.put(`${API}/${req.params.id}`, req.body);
        res.redirect(`/eleves/${req.params.id}`);
    } catch (err) {
        const erreur = err.response?.data?.error || 'Erreur lors de la modification.';
        const eleve = { ...req.body, id_eleve: req.params.id };
        res.render('eleves/edit', { eleve, erreur });
    }
};

exports.destroy = async (req, res) => {
    try {
        await axios.delete(`${API}/${req.params.id}`);
        res.redirect('/eleves');
    } catch (err) {
        res.redirect('/eleves');
    }
};

exports.importForm = (req, res) => {
    res.render('eleves/import', { erreur: null, resultat: null });
};

exports.importCSV = async (req, res) => {
    if (!req.file) {
        return res.render('eleves/import', { erreur: 'Aucun fichier sélectionné.', resultat: null });
    }

    try {
        const form = new FormData();
        form.append('fichier', fs.createReadStream(req.file.path), req.file.originalname);

        const response = await axios.post(`${API}/import`, form, {
            headers: form.getHeaders()
        });

        fs.unlinkSync(req.file.path);
        res.render('eleves/import', { erreur: null, resultat: response.data });

    } catch (err) {
        res.render('eleves/import', { erreur: "Erreur lors de l'import.", resultat: null });
    }
};

exports.stagesAlerte = async (req, res) => {
    try {
        const elevesResp = await axios.get(API);
        const eleves = elevesResp.data;

        const stages = [];

        for (const eleve of eleves) {
            try {
                const stagesResp = await axios.get(`http://localhost:3000/eleves/${eleve.id_eleve}/stages`);
                for (const stage of stagesResp.data) {
                    stages.push({
                        ...stage,
                        nom: eleve.nom,
                        prenom: eleve.prenom,
                        alerte: stage.nb_lettres_envoyees > 15
                    });
                }
            } catch (err) {
                // pas de stages pour cet élève
            }
        }

        res.render('stages/index', { stages });
    } catch (err) {
        res.render('stages/index', { stages: [], erreur: "Impossible de contacter l'API." });
    }
};

exports.addOption = async (req, res) => {
    try {
        await axios.post(`http://localhost:3000/eleves/${req.params.id}/options`, {
            id_option: req.body.id_option
        });
        res.redirect(`/eleves/${req.params.id}`);
    } catch (err) {
        res.redirect(`/eleves/${req.params.id}`);
    }
};

exports.removeOption = async (req, res) => {
    try {
        await axios.delete(`http://localhost:3000/eleves/${req.params.id}/options/${req.params.id_option}`);
        res.redirect(`/eleves/${req.params.id}`);
    } catch (err) {
        res.redirect(`/eleves/${req.params.id}`);
    }
};
exports.addProjet = async (req, res) => {
    try {
        await axios.post(`http://localhost:3000/projets/eleve/${req.params.id}`, {
            id_projet: req.body.id_projet,
            est_responsable: req.body.est_responsable ? 1 : 0
        });
        res.redirect(`/eleves/${req.params.id}`);
    } catch (err) {
        res.redirect(`/eleves/${req.params.id}`);
    }
};

exports.removeProjet = async (req, res) => {
    try {
        await axios.delete(`http://localhost:3000/projets/eleve/${req.params.id}/${req.params.id_projet}`);
        res.redirect(`/eleves/${req.params.id}`);
    } catch (err) {
        res.redirect(`/eleves/${req.params.id}`);
    }
};