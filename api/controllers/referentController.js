const Referent = require('../models/Referent');

const getAllReferents = async (req, res) => {
    try {
        const referents = await Referent.getAll();
        res.json(referents);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createReferent = async (req, res) => {
    try {
        const { id_professeur, id_eleve } = req.body;
        if (!id_professeur || !id_eleve) {
            return res.status(400).json({ message: 'id_professeur et id_eleve sont obligatoires' });
        }
        if (!Number.isInteger(id_professeur)) {
            return res.status(400).json({ message: 'id_professeur doit être un entier' });
        }
        if (!Number.isInteger(id_eleve)) {
            return res.status(400).json({ message: 'id_eleve doit être un entier' });
        }
        await Referent.create(id_professeur, id_eleve);
        res.status(201).json({ message: 'Référent affecté' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Cette affectation existe déjà' });
        }
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const deleteReferent = async (req, res) => {
    try {
        const id_professeur = parseInt(req.params.id_professeur);
        const id_eleve = parseInt(req.params.id_eleve);
        if (isNaN(id_professeur) || isNaN(id_eleve)) {
            return res.status(400).json({ message: 'IDs invalides' });
        }
        await Referent.remove(id_professeur, id_eleve);
        res.json({ message: 'Référent retiré' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllReferents, createReferent, deleteReferent };