const Classe = require('../models/Classe');

const getAllClasses = async (req, res) => {
    try {
        const classes = await Classe.getAll();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getClasseById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const classe = await Classe.getById(id);
        if (!classe) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }
        res.json(classe);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getElevesParClasse = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const eleves = await Classe.getEleves(id);
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createClasse = async (req, res) => {
    try {
        const { niveau, lettre, annee_scolaire } = req.body;
        if (!niveau || !lettre || !annee_scolaire) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (!Number.isInteger(niveau) || ![3, 4, 5, 6].includes(niveau)) {
            return res.status(400).json({ message: 'Niveau invalide (3, 4, 5 ou 6)' });
        }
        if (typeof lettre !== 'string' || lettre.length > 2) {
            return res.status(400).json({ message: 'Lettre invalide (max 2 caractères)' });
        }
        if (typeof annee_scolaire !== 'string' || !/^\d{4}-\d{4}$/.test(annee_scolaire)) {
            return res.status(400).json({ message: 'Année scolaire invalide (format: 2024-2025)' });
        }
        const id = await Classe.create(niveau, lettre, annee_scolaire);
        res.status(201).json({ message: 'Classe créée', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateClasse = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const { niveau, lettre, annee_scolaire } = req.body;
        if (!niveau || !lettre || !annee_scolaire) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (!Number.isInteger(niveau) || ![3, 4, 5, 6].includes(niveau)) {
            return res.status(400).json({ message: 'Niveau invalide (3, 4, 5 ou 6)' });
        }
        if (typeof lettre !== 'string' || lettre.length > 2) {
            return res.status(400).json({ message: 'Lettre invalide (max 2 caractères)' });
        }
        if (typeof annee_scolaire !== 'string' || !/^\d{4}-\d{4}$/.test(annee_scolaire)) {
            return res.status(400).json({ message: 'Année scolaire invalide (format: 2024-2025)' });
        }
        await Classe.update(id, niveau, lettre, annee_scolaire);
        res.json({ message: 'Classe modifiée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteClasse = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        await Classe.remove(id);
        res.json({ message: 'Classe supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllClasses, getClasseById, getElevesParClasse, createClasse, updateClasse, deleteClasse };