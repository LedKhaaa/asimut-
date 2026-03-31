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
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const parent = await Parent.getById(id);
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
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const eleves = await Parent.getEleves(id);
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createParent = async (req, res) => {
    try {
        const { nom, prenom, email, id_eleve } = req.body;
        if (!nom || !prenom || !email || !id_eleve) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (typeof nom !== 'string' || nom.length > 100) {
            return res.status(400).json({ message: 'Nom invalide (max 100 caractères)' });
        }
        if (typeof prenom !== 'string' || prenom.length > 100) {
            return res.status(400).json({ message: 'Prénom invalide (max 100 caractères)' });
        }
        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Email invalide' });
        }
        if (!Number.isInteger(id_eleve)) {
            return res.status(400).json({ message: 'id_eleve doit être un entier' });
        }
        const id = await Parent.create(nom, prenom, email, id_eleve);
        res.status(201).json({ message: 'Parent créé', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateParent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const { nom, prenom, email, id_eleve } = req.body;
        if (!nom || !prenom || !email || !id_eleve) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (typeof nom !== 'string' || nom.length > 100) {
            return res.status(400).json({ message: 'Nom invalide (max 100 caractères)' });
        }
        if (typeof prenom !== 'string' || prenom.length > 100) {
            return res.status(400).json({ message: 'Prénom invalide (max 100 caractères)' });
        }
        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Email invalide' });
        }
        if (!Number.isInteger(id_eleve)) {
            return res.status(400).json({ message: 'id_eleve doit être un entier' });
        }
        await Parent.update(id, nom, prenom, email, id_eleve);
        res.json({ message: 'Parent modifié' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteParent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        await Parent.remove(id);
        res.json({ message: 'Parent supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllParents, getParentById, getElevesParParent, createParent, updateParent, deleteParent };