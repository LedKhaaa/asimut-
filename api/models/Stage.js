const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM STAGE');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM STAGE WHERE id_stage = ?', [id]);
    return rows[0];
};

const getByEleve = async (id_eleve) => {
    const [rows] = await db.query('SELECT * FROM STAGE WHERE id_eleve = ?', [id_eleve]);
    return rows;
};

const create = async (id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin) => {
    const [result] = await db.query(
        'INSERT INTO STAGE (id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin]
    );
    return result.insertId;
};

const update = async (id, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin) => {
    await db.query(
        'UPDATE STAGE SET entreprise = ?, contact_nom = ?, contact_email = ?, nb_lettres_envoyees = ?, nb_lettres_recues = ?, date_entretien = ?, resultat = ?, date_debut = ?, date_fin = ? WHERE id_stage = ?',
        [entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin, id]
    );
};

const remove = async (id) => {
    await db.query('DELETE FROM STAGE WHERE id_stage = ?', [id]);
};

module.exports = { getAll, getById, getByEleve, create, update, remove };