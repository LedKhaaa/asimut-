const Moyenne = require('../models/Moyenne');

const getMoyennesByEleve = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const moyennes = await Moyenne.getByEleve(id);
        res.json(moyennes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const createMoyenne = async (req, res) => {
    try {
        const id_eleve = parseInt(req.params.id);
        if (isNaN(id_eleve)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const { semestre, annee_scolaire, valeur } = req.body;
        if (!semestre || !annee_scolaire || valeur === undefined) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }
        if (!Number.isInteger(semestre) || ![1, 2].includes(semestre)) {
            return res.status(400).json({ message: 'Semestre invalide (1 ou 2)' });
        }
        if (typeof annee_scolaire !== 'string' || !/^\d{4}-\d{4}$/.test(annee_scolaire)) {
            return res.status(400).json({ message: 'Année scolaire invalide (format: 2024-2025)' });
        }
        if (typeof valeur !== 'number' || valeur < 0 || valeur > 20) {
            return res.status(400).json({ message: 'Valeur invalide (entre 0 et 20)' });
        }
        const id = await Moyenne.create(id_eleve, semestre, annee_scolaire, valeur);
        res.status(201).json({ message: 'Moyenne créée', id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const validerMoyenne = async (req, res) => {
    try {
        const id = parseInt(req.params.mid);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalide' });
        }
        const moyenne = await Moyenne.getById(id);
        if (!moyenne) {
            return res.status(404).json({ message: 'Moyenne non trouvée' });
        }
        if (moyenne.validee) {
            return res.status(400).json({ message: 'Moyenne déjà validée' });
        }
        await Moyenne.valider(id);
        res.json({ message: 'Moyenne validée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { getMoyennesByEleve, createMoyenne, validerMoyenne };