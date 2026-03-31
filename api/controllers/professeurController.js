const Professeur = require('../models/Professeur');

const getAllProfesseurs = async (req, res) => {
    try {
        const professeurs = await Professeur.getAll();
        res.json(professeurs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getProfesseurById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const professeur = await Professeur.getById(id);
        if (!professeur) {
            return res.status(404).json({ message: 'Professeur non trouvé' });
        }
        res.json(professeur);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getElevesParProfesseur = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const eleves = await Professeur.getEleves(id);
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createProfesseur = async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        if (!nom || !prenom || !email) {
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
        const id = await Professeur.create(nom, prenom, email);
        res.status(201).json({ message: 'Professeur créé', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const updateProfesseur = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const { nom, prenom, email } = req.body;
        if (!nom || !prenom || !email) {
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
        await Professeur.update(id, nom, prenom, email);
        res.json({ message: 'Professeur modifié' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteProfesseur = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        await Professeur.remove(id);
        res.json({ message: 'Professeur supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllProfesseurs, getProfesseurById, getElevesParProfesseur, createProfesseur, updateProfesseur, deleteProfesseur };