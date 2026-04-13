const Projet = require('../models/Projet');

const getAllProjets = async (req, res) => {
    try {
        const projets = await Projet.getAll();
        res.json(projets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProjetsByEleve = async (req, res) => {
    try {
        const projets = await Projet.getByEleve(req.params.id);
        res.json(projets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProjetToEleve = async (req, res) => {
    try {
        const { id_projet, date_debut, est_responsable } = req.body;
        await Projet.addToEleve(req.params.id, id_projet, date_debut, est_responsable);
        res.status(201).json({ message: 'Projet ajouté à l\'élève' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeProjetFromEleve = async (req, res) => {
    try {
        await Projet.removeFromEleve(req.params.id, req.params.id_projet);
        res.json({ message: 'Projet retiré de l\'élève' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllProjets, getProjetsByEleve, addProjetToEleve, removeProjetFromEleve };