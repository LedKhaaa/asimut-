const Option = require('../models/Option');

const getAllOptions = async (req, res) => {
    try {
        const options = await Option.getAll();
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getOptionsByEleve = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log('getOptionsByEleve appelé avec id:', id);
        if (isNaN(id)) return res.status(400).json({ message: 'ID invalide' });
        const options = await Option.getByEleve(id);
        console.log('options trouvées:', options);
        res.json(options);
    } catch (error) {
        console.log('erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const addOptionToEleve = async (req, res) => {
    try {
        const id_eleve = parseInt(req.params.id);
        const id_option = parseInt(req.body.id_option);
        if (isNaN(id_eleve) || isNaN(id_option)) {
            return res.status(400).json({ message: 'IDs invalides' });
        }
        await Option.addToEleve(id_eleve, id_option);
        res.status(201).json({ message: 'Option ajoutée' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Option déjà assignée' });
        }
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const removeOptionFromEleve = async (req, res) => {
    try {
        const id_eleve = parseInt(req.params.id);
        const id_option = parseInt(req.params.id_option);
        if (isNaN(id_eleve) || isNaN(id_option)) {
            return res.status(400).json({ message: 'IDs invalides' });
        }
        await Option.removeFromEleve(id_eleve, id_option);
        res.json({ message: 'Option retirée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getAllOptions, getOptionsByEleve, addOptionToEleve, removeOptionFromEleve };