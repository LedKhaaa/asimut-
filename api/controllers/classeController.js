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
        const classe = await Classe.getById(req.params.id);
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
        const eleves = await Classe.getEleves(req.params.id);
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createClasse = async (req, res) => {
    try {
        const { niveau, lettre, annee_scolaire } = req.body;
        const id = await Classe.create(niveau, lettre, annee_scolaire);
        res.status(201).json({ message: 'Classe créée', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateClasse = async (req, res) => {
    try {
        const { niveau, lettre, annee_scolaire } = req.body;
        await Classe.update(req.params.id, niveau, lettre, annee_scolaire);
        res.json({ message: 'Classe modifiée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteClasse = async (req, res) => {
    try {
        await Classe.remove(req.params.id);
        res.json({ message: 'Classe supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllClasses, getClasseById, getElevesParClasse, createClasse, updateClasse, deleteClasse };