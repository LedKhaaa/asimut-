const db = require('../database/db');

const getByEleve = async (id_eleve) => {
    const [rows] = await db.query('SELECT * FROM MOYENNE WHERE id_eleve = ?', [id_eleve]);
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM MOYENNE WHERE id_moyenne = ?', [id]);
    return rows[0];
};

const create = async (id_eleve, semestre, annee_scolaire, valeur) => {
    const [result] = await db.query(
        'INSERT INTO MOYENNE (id_eleve, semestre, annee_scolaire, valeur) VALUES (?, ?, ?, ?)',
        [id_eleve, semestre, annee_scolaire, valeur]
    );
    return result.insertId;
};

const valider = async (id) => {
    await db.query('UPDATE MOYENNE SET validee = TRUE WHERE id_moyenne = ?', [id]);
};

const remove = async (id) => {
    await db.query('DELETE FROM MOYENNE WHERE id_moyenne = ?', [id]);
};

module.exports = { getByEleve, getById, create, valider, remove };