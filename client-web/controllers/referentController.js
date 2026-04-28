const axios = require('axios');
require('dotenv').config();

const API = process.env.API_URL;

exports.index = async (req, res) => {
    try {
        const profsResp = await axios.get(`${API}/professeurs`);
        const profs = profsResp.data;

        let elevesReferent = [];
        let profSelectionne = null;

        if (req.query.id_professeur) {
            const id = req.query.id_professeur;
            const elevesResp = await axios.get(`${API}/referents/${id}/eleves`);
            elevesReferent = elevesResp.data;
            profSelectionne = profs.find(p => p.id_professeur == id);
        }

        res.render('referents/index', {
            profs,
            elevesReferent,
            profSelectionne,
            erreur: null
        });
    } catch (err) {
        res.render('referents/index', {
            profs: [],
            elevesReferent: [],
            profSelectionne: null,
            erreur: "Impossible de contacter l'API."
        });
    }
};

exports.roundRobin = async (req, res) => {
    try {
        await axios.post(`${API}/referents/round-robin`);
        res.redirect('/referents');
    } catch (err) {
        res.redirect('/referents');
    }
};