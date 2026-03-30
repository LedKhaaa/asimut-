const Eleve = require('../models/Eleve');

// GET /eleves — tous les élèves
const getAllEleves = async (req, res) => {
    try {
        const eleves = await Eleve.getAll();
        res.json(eleves);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// GET /eleves/:id — un seul élève
const getEleveById = async (req, res) => {
    try {
        const eleve = await Eleve.getById(req.params.id);
        if (!eleve) {
            return res.status(404).json({ message: 'Élève non trouvé' });
        }
        res.json(eleve);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// POST /eleves — créer un élève
const createEleve = async (req, res) => {
    try {
        const { nom, prenom, identifiant, id_classe } = req.body;
        const id = await Eleve.create(nom, prenom, identifiant, id_classe);
        res.status(201).json({ message: 'Élève créé', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// PUT /eleves/:id — modifier un élève
const updateEleve = async (req, res) => {
    try {
        const { nom, prenom, identifiant, id_classe } = req.body;
        await Eleve.update(req.params.id, nom, prenom, identifiant, id_classe);
        res.json({ message: 'Élève modifié' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// DELETE /eleves/:id — supprimer un élève
const deleteEleve = async (req, res) => {
    try {
        await Eleve.remove(req.params.id);
        res.json({ message: 'Élève supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllEleves, getEleveById, createEleve, updateEleve, deleteEleve };