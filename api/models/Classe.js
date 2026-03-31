const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM CLASSE');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM CLASSE WHERE id_classe = ?', [id]);
    return rows[0];
};

const getEleves = async (id) => {
    const [rows] = await db.query('SELECT * FROM ELEVE WHERE id_classe = ?', [id]);
    return rows;
};

const create = async (niveau, lettre, annee_scolaire) => {
    const [result] = await db.query(
        'INSERT INTO CLASSE (niveau, lettre, annee_scolaire) VALUES (?, ?, ?)',
        [niveau, lettre, annee_scolaire]
    );
    return result.insertId;
};

const update = async (id, niveau, lettre, annee_scolaire) => {
    await db.query(
        'UPDATE CLASSE SET niveau = ?, lettre = ?, annee_scolaire = ? WHERE id_classe = ?',
        [niveau, lettre, annee_scolaire, id]
    );
};

const remove = async (id) => {
    await db.query('DELETE FROM CLASSE WHERE id_classe = ?', [id]);
};

module.exports = { getAll, getById, getEleves, create, update, remove };