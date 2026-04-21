const axios = require('axios');
require('dotenv').config();

const API = process.env.API_URL + '/parents';

exports.publipostageForm = (req, res) => {
    res.render('parents/publipostage', { resultats: [], erreur: null });
};

exports.publipostageEnvoyer = async (req, res) => {
    try {
        const { sujet, message } = req.body;
        const response = await axios.post(`${API}/publipostage`, { sujet, message });
        res.render('parents/publipostage', {
            resultats: response.data.resultats,
            erreur: null
        });
    } catch (err) {
        res.render('parents/publipostage', {
            resultats: [],
            erreur: "Erreur lors de l'envoi des emails."
        });
    }
};