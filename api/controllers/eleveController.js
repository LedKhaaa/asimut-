const Eleve = require('../models/Eleve');
const { parse } = require('csv-parse/sync');
const fs = require('fs');

const getAllEleves = async (req, res) => {
    try {
        const eleves = await Eleve.getAll();
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getEleveById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const eleve = await Eleve.getById(id);
        if (!eleve) {
            return res.status(404).json({ message: 'Élève non trouvé' });
        }
        res.json(eleve);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createEleve = async (req, res) => {
    try {
        const { nom, prenom, identifiant, id_classe } = req.body;
        if (!nom || !prenom || !identifiant || !id_classe) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (typeof nom !== 'string' || nom.length > 100) {
            return res.status(400).json({ message: 'Nom invalide (max 100 caractères)' });
        }
        if (typeof prenom !== 'string' || prenom.length > 100) {
            return res.status(400).json({ message: 'Prénom invalide (max 100 caractères)' });
        }
        if (typeof identifiant !== 'string' || identifiant.length > 50) {
            return res.status(400).json({ message: 'Identifiant invalide (max 50 caractères)' });
        }
        if (!Number.isInteger(id_classe)) {
            return res.status(400).json({ message: 'id_classe doit être un entier' });
        }
        const id = await Eleve.create(nom, prenom, identifiant, id_classe);
        res.status(201).json({ message: 'Élève créé', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateEleve = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const { nom, prenom, identifiant, id_classe } = req.body;
        if (!nom || !prenom || !identifiant || !id_classe) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (typeof nom !== 'string' || nom.length > 100) {
            return res.status(400).json({ message: 'Nom invalide (max 100 caractères)' });
        }
        if (typeof prenom !== 'string' || prenom.length > 100) {
            return res.status(400).json({ message: 'Prénom invalide (max 100 caractères)' });
        }
        if (typeof identifiant !== 'string' || identifiant.length > 50) {
            return res.status(400).json({ message: 'Identifiant invalide (max 50 caractères)' });
        }
        if (!Number.isInteger(id_classe)) {
            return res.status(400).json({ message: 'id_classe doit être un entier' });
        }
        await Eleve.update(id, nom, prenom, identifiant, id_classe);
        res.json({ message: 'Élève modifié' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteEleve = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        await Eleve.remove(id);
        res.json({ message: 'Élève supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const importCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier reçu.' });
    }

    try {
        const contenu = fs.readFileSync(req.file.path, 'utf8');

        const lignes = parse(contenu, {
            delimiter: ' ',
            columns: true,
            skip_empty_lines: true,
            relax_column_count: true,
            trim: true
        });

        let importes = 0;
        let erreurs = [];

        for (const ligne of lignes) {
            const { nom, prenom, identifiant, niveau } = ligne;

            if (!nom || !prenom || !identifiant || !niveau) {
                erreurs.push(`Ligne ignorée : données manquantes (${JSON.stringify(ligne)})`);
                continue;
            }

            try {
                await Eleve.create(nom, prenom, identifiant, null);
                importes++;
            } catch (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    erreurs.push(`Doublon ignoré : ${identifiant}`);
                } else {
                    erreurs.push(`Erreur pour ${identifiant} : ${err.message}`);
                }
            }
        }

        fs.unlinkSync(req.file.path);
        res.json({ importes, erreurs });

    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du traitement du CSV.', detail: err.message });
    }
};

module.exports = { getAllEleves, getEleveById, createEleve, updateEleve, deleteEleve, importCSV };