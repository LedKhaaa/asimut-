/**
 * @file app.js
 * @description Point d'entrée de l'API REST Asim'UT
 * @author Ton nom
 */

const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

// Import des routes
const eleveRoutes = require('./routes/eleveRoutes');
const classeRoutes = require('./routes/classeRoutes');
const parentRoutes = require('./routes/parentRoutes');
const stageRoutes = require('./routes/stageRoutes');
const professeurRoutes = require('./routes/professeurRoutes');
const moyenneRoutes = require('./routes/moyenneRoutes');
const referentRoutes = require('./routes/referentRoutes');
const optionRoutes = require('./routes/optionRoutes');
const projetRoutes = require('./routes/projetRoutes');

// Utilisation des routes
app.use('/classes', classeRoutes);
app.use('/eleves', eleveRoutes);
app.use('/parents', parentRoutes);
app.use('/stages', stageRoutes);
app.use('/professeurs', professeurRoutes);
app.use('/eleves/:id/moyennes', moyenneRoutes);
app.use('/referents', referentRoutes);
app.use('/options', optionRoutes);
app.use('/projets', projetRoutes);
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

/**
 * @route GET /
 * @description Route de test pour vérifier que l'API est opérationnelle
 * @returns {object} Message de confirmation
 */
app.get('/', (req, res) => {
    res.json({ message: "API Asim'UT opérationnelle 🚀" });
});

const PORT = process.env.PORT || 3000;

/**
 * @description Démarrage du serveur sur le port défini dans .env ou 3000 par défaut
 */
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});