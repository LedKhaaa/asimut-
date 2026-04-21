const Parent = require('../models/Parent');
const { envoyerEmail } = require('../utils/mailer');

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

const publipostage = async (req, res) => {
    try {
        const { sujet, message } = req.body;
        if (!sujet || !message) {
            return res.status(400).json({ error: 'Sujet et message obligatoires' });
        }

        const parents = await Parent.getAllAvecEleve();
        if (parents.length === 0) {
            return res.status(404).json({ error: 'Aucun parent trouvé' });
        }

        const resultats = [];

        for (const parent of parents) {
            const contenu = `
                <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto;">
                    <h2 style="color:#1a1a2e;">Collège Asimov — Grenoble</h2>
                    <p>Bonjour <strong>${parent.prenom} ${parent.nom}</strong>,</p>
                    <p>Ce message concerne votre enfant <strong>${parent.eleve_prenom} ${parent.eleve_nom}</strong>.</p>
                    <hr/>
                    <p>${message.replace(/\n/g, '<br/>')}</p>
                    <hr/>
                    <p style="color:#888; font-size:0.85rem;">
                        Collège Asimov — Route de Narbonne, Saint-Martin-le-Vinoux, Grenoble
                    </p>
                </div>
            `;

            const urlApercu = await envoyerEmail(parent.email, sujet, contenu);
            resultats.push({
                parent: `${parent.prenom} ${parent.nom}`,
                eleve: `${parent.eleve_prenom} ${parent.eleve_nom}`,
                email: parent.email,
                apercu: urlApercu
            });
        }

        res.json({ message: `${resultats.length} email(s) envoyé(s)`, resultats });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { getAllParents, getParentById, getElevesParParent, createParent, updateParent, deleteParent, publipostage };