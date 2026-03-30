const db = require('../database/db');

// Récupérer tous les élèves
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM ELEVE');
    return rows;
};

// Récupérer un élève par son id
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM ELEVE WHERE id_eleve = ?', [id]);
    return rows[0];
};

// Créer un élève
const create = async (nom, prenom, identifiant, id_classe) => {
    const [result] = await db.query(
        'INSERT INTO ELEVE (nom, prenom, identifiant, id_classe) VALUES (?, ?, ?, ?)',
        [nom, prenom, identifiant, id_classe]
    );
    return result.insertId;
};

// Modifier un élève
const update = async (id, nom, prenom, identifiant, id_classe) => {
    await db.query(
        'UPDATE ELEVE SET nom = ?, prenom = ?, identifiant = ?, id_classe = ? WHERE id_eleve = ?',
        [nom, prenom, identifiant, id_classe, id]
    );
};

// Supprimer un élève
const remove = async (id) => {
    await db.query('DELETE FROM ELEVE WHERE id_eleve = ?', [id]);
};

module.exports = { getAll, getById, create, update, remove };