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

// Utilisation des routes
app.use('/classes', classeRoutes);
app.use('/eleves', eleveRoutes);
app.use('/parents', parentRoutes);
app.use('/stages', stageRoutes);
app.use('/professeurs', professeurRoutes);
app.use('/eleves/:id/moyennes', moyenneRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: "API Asim'UT opérationnelle 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});