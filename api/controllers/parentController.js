const Parent = require('../models/Parent');

const getAllParents = async (req, res) => {
    try {
        const parents = await Parent.getAll();
        res.json(parents);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getParentById = async (req, res) => {
    try {
        const parent = await Parent.getById(req.params.id);
        if (!parent) {
            return res.status(404).json({ message: 'Parent non trouvé' });
        }
        res.json(parent);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getElevesParParent = async (req, res) => {
    try {
        const eleves = await Parent.getEleves(req.params.id);
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createParent = async (req, res) => {
    try {
        const { nom, prenom, email, id_eleve } = req.body;
        const id = await Parent.create(nom, prenom, email, id_eleve);
        res.status(201).json({ message: 'Parent créé', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateParent = async (req, res) => {
    try {
        const { nom, prenom, email, id_eleve } = req.body;
        await Parent.update(req.params.id, nom, prenom, email, id_eleve);
        res.json({ message: 'Parent modifié' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteParent = async (req, res) => {
    try {
        await Parent.remove(req.params.id);
        res.json({ message: 'Parent supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllParents, getParentById, getElevesParParent, createParent, updateParent, deleteParent };