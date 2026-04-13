const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM PROJET');
    return rows;
};

const getByEleve = async (id_eleve) => {
    const [rows] = await db.query(`
        SELECT p.id_projet, p.nom, p.description, p.valide,
               ep.date_debut, ep.date_fin, ep.est_responsable
        FROM PROJET p
        JOIN ELEVE_PROJET ep ON p.id_projet = ep.id_projet
        WHERE ep.id_eleve = ?
    `, [id_eleve]);
    return rows;
};

const addToEleve = async (id_eleve, id_projet, date_debut, est_responsable) => {
    await db.query(
        'INSERT INTO ELEVE_PROJET (id_eleve, id_projet, date_debut, est_responsable) VALUES (?, ?, ?, ?)',
        [id_eleve, id_projet, date_debut || null, est_responsable || 0]
    );
};

const removeFromEleve = async (id_eleve, id_projet) => {
    await db.query(
        'DELETE FROM ELEVE_PROJET WHERE id_eleve = ? AND id_projet = ?',
        [id_eleve, id_projet]
    );
};

module.exports = { getAll, getByEleve, addToEleve, removeFromEleve };