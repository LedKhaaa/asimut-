const Stage = require('../models/Stage');

const getAllStages = async (req, res) => {
    try {
        const stages = await Stage.getAll();
        res.json(stages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getStageById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const stage = await Stage.getById(id);
        if (!stage) {
            return res.status(404).json({ message: 'Stage non trouvé' });
        }
        res.json(stage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getStagesByEleve = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const stages = await Stage.getByEleve(id);
        res.json(stages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createStage = async (req, res) => {
    try {
        const { id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin } = req.body;
        if (!id_eleve || !entreprise) {
            return res.status(400).json({ message: 'id_eleve et entreprise sont obligatoires' });
        }
        if (!Number.isInteger(id_eleve)) {
            return res.status(400).json({ message: 'id_eleve doit être un entier' });
        }
        if (typeof entreprise !== 'string' || entreprise.length > 150) {
            return res.status(400).json({ message: 'Entreprise invalide (max 150 caractères)' });
        }
        if (contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
            return res.status(400).json({ message: 'Email contact invalide' });
        }
        if (nb_lettres_envoyees !== undefined && !Number.isInteger(nb_lettres_envoyees)) {
            return res.status(400).json({ message: 'nb_lettres_envoyees doit être un entier' });
        }
        if (nb_lettres_recues !== undefined && !Number.isInteger(nb_lettres_recues)) {
            return res.status(400).json({ message: 'nb_lettres_recues doit être un entier' });
        }
        const id = await Stage.create(id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin);
        res.status(201).json({ message: 'Stage créé', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateStage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const { entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin } = req.body;
        if (!entreprise) {
            return res.status(400).json({ message: 'entreprise est obligatoire' });
        }
        if (typeof entreprise !== 'string' || entreprise.length > 150) {
            return res.status(400).json({ message: 'Entreprise invalide (max 150 caractères)' });
        }
        if (contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
            return res.status(400).json({ message: 'Email contact invalide' });
        }
        if (nb_lettres_envoyees !== undefined && !Number.isInteger(nb_lettres_envoyees)) {
            return res.status(400).json({ message: 'nb_lettres_envoyees doit être un entier' });
        }
        if (nb_lettres_recues !== undefined && !Number.isInteger(nb_lettres_recues)) {
            return res.status(400).json({ message: 'nb_lettres_recues doit être un entier' });
        }
        await Stage.update(id, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin);
        res.json({ message: 'Stage modifié' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteStage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        await Stage.remove(id);
        res.json({ message: 'Stage supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllStages, getStageById, getStagesByEleve, createStage, updateStage, deleteStage };