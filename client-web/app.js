const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
require('dotenv').config();

const eleveRoutes = require('./routes/eleveRoutes');
const parentRoutes = require('./routes/parentRoutes');
const referentRoutes = require('./routes/referentRoutes');

const app = express();

// Moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layout par défaut
app.use(ejsLayouts);
app.set('layout', 'layout');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/eleves', eleveRoutes);
app.use('/parents', parentRoutes);
app.use('/referents', referentRoutes);
// Redirection racine → liste des élèves
app.get('/', (req, res) => {
    res.redirect('/eleves');
});

// Démarrage
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Client web démarré sur http://localhost:${PORT}`);
});