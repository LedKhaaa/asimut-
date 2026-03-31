const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM PROFESSEUR');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM PROFESSEUR WHERE id_professeur = ?', [id]);
    return rows[0];
};

const getEleves = async (id) => {
    const [rows] = await db.query(
        'SELECT e.* FROM ELEVE e JOIN REFERENT r ON e.id_eleve = r.id_eleve WHERE r.id_professeur = ?',
        [id]
    );
    return rows;
};

const create = async (nom, prenom, email) => {
    const [result] = await db.query(
        'INSERT INTO PROFESSEUR (nom, prenom, email) VALUES (?, ?, ?)',
        [nom, prenom, email]
    );
    return result.insertId;
};

const update = async (id, nom, prenom, email) => {
    await db.query(
        'UPDATE PROFESSEUR SET nom = ?, prenom = ?, email = ? WHERE id_professeur = ?',
        [nom, prenom, email, id]
    );
};

const remove = async (id) => {
    await db.query('DELETE FROM PROFESSEUR WHERE id_professeur = ?', [id]);
};

module.exports = { getAll, getById, getEleves, create, update, remove };