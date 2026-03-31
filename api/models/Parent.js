const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM PARENT');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM PARENT WHERE id_parent = ?', [id]);
    return rows[0];
};

const getEleves = async (id) => {
    const [rows] = await db.query('SELECT * FROM ELEVE WHERE id_eleve = (SELECT id_eleve FROM PARENT WHERE id_parent = ?)', [id]);
    return rows;
};

const create = async (nom, prenom, email, id_eleve) => {
    const [result] = await db.query(
        'INSERT INTO PARENT (nom, prenom, email, id_eleve) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, id_eleve]
    );
    return result.insertId;
};

const update = async (id, nom, prenom, email, id_eleve) => {
    await db.query(
        'UPDATE PARENT SET nom = ?, prenom = ?, email = ?, id_eleve = ? WHERE id_parent = ?',
        [nom, prenom, email, id_eleve, id]
    );
};

const remove = async (id) => {
    await db.query('DELETE FROM PARENT WHERE id_parent = ?', [id]);
};

module.exports = { getAll, getById, getEleves, create, update, remove };