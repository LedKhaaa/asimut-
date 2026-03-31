const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query(
        `SELECT p.nom AS prof_nom, p.prenom AS prof_prenom, 
        e.nom AS eleve_nom, e.prenom AS eleve_prenom,
        r.id_professeur, r.id_eleve
        FROM REFERENT r
        JOIN PROFESSEUR p ON r.id_professeur = p.id_professeur
        JOIN ELEVE e ON r.id_eleve = e.id_eleve`
    );
    return rows;
};

const create = async (id_professeur, id_eleve) => {
    await db.query(
        'INSERT INTO REFERENT (id_professeur, id_eleve) VALUES (?, ?)',
        [id_professeur, id_eleve]
    );
};

const remove = async (id_professeur, id_eleve) => {
    await db.query(
        'DELETE FROM REFERENT WHERE id_professeur = ? AND id_eleve = ?',
        [id_professeur, id_eleve]
    );
};

module.exports = { getAll, create, remove };