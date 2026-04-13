const db = require('../database/db');

/**
 * Récupère toutes les options
 */
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM OPTION_COURS');
    return rows;
};

/**
 * Récupère les options d'un élève
 */
const getByEleve = async (id_eleve) => {
    const [rows] = await db.query(`
        SELECT o.id_option, o.libelle
        FROM OPTION_COURS o
        JOIN ELEVE_OPTION eo ON o.id_option = eo.id_option
        WHERE eo.id_eleve = ?
    `, [id_eleve]);
    return rows;
};

/**
 * Ajoute une option à un élève
 */
const addToEleve = async (id_eleve, id_option) => {
    await db.query(
        'INSERT INTO ELEVE_OPTION (id_eleve, id_option) VALUES (?, ?)',
        [id_eleve, id_option]
    );
};

/**
 * Retire une option d'un élève
 */
const removeFromEleve = async (id_eleve, id_option) => {
    await db.query(
        'DELETE FROM ELEVE_OPTION WHERE id_eleve = ? AND id_option = ?',
        [id_eleve, id_option]
    );
};

module.exports = { getAll, getByEleve, addToEleve, removeFromEleve };