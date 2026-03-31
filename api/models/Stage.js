/**
 * @file Stage.js
 * @description Modèle de données pour la table STAGE
 * @author Ton nom
 */

const db = require('../database/db');

/**
 * @description Récupère tous les stages
 * @returns {Promise<Array>} Liste de tous les stages
 */
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM STAGE');
    return rows;
};

/**
 * @description Récupère un stage par son identifiant
 * @param {number} id - Identifiant du stage
 * @returns {Promise<object|undefined>} Le stage trouvé ou undefined
 */
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM STAGE WHERE id_stage = ?', [id]);
    return rows[0];
};

/**
 * @description Récupère tous les stages d'un élève
 * @param {number} id_eleve - Identifiant de l'élève
 * @returns {Promise<Array>} Liste des stages de l'élève
 */
const getByEleve = async (id_eleve) => {
    const [rows] = await db.query('SELECT * FROM STAGE WHERE id_eleve = ?', [id_eleve]);
    return rows;
};

/**
 * @description Crée un nouveau stage
 * @param {number} id_eleve - Identifiant de l'élève
 * @param {string} entreprise - Nom de l'entreprise
 * @param {string} contact_nom - Nom du contact
 * @param {string} contact_email - Email du contact
 * @param {number} nb_lettres_envoyees - Nombre de lettres envoyées
 * @param {number} nb_lettres_recues - Nombre de lettres reçues
 * @param {string} date_entretien - Date de l'entretien (YYYY-MM-DD)
 * @param {string} resultat - Résultat de l'entretien
 * @param {string} date_debut - Date de début du stage (YYYY-MM-DD)
 * @param {string} date_fin - Date de fin du stage (YYYY-MM-DD)
 * @returns {Promise<number>} Identifiant du stage créé
 */
const create = async (id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin) => {
    const [result] = await db.query(
        'INSERT INTO STAGE (id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id_eleve, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin]
    );
    return result.insertId;
};

/**
 * @description Met à jour un stage
 * @param {number} id - Identifiant du stage à modifier
 * @param {string} entreprise - Nouveau nom de l'entreprise
 * @param {string} contact_nom - Nouveau nom du contact
 * @param {string} contact_email - Nouvel email du contact
 * @param {number} nb_lettres_envoyees - Nouveau nombre de lettres envoyées
 * @param {number} nb_lettres_recues - Nouveau nombre de lettres reçues
 * @param {string} date_entretien - Nouvelle date d'entretien
 * @param {string} resultat - Nouveau résultat
 * @param {string} date_debut - Nouvelle date de début
 * @param {string} date_fin - Nouvelle date de fin
 * @returns {Promise<void>}
 */
const update = async (id, entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin) => {
    await db.query(
        'UPDATE STAGE SET entreprise = ?, contact_nom = ?, contact_email = ?, nb_lettres_envoyees = ?, nb_lettres_recues = ?, date_entretien = ?, resultat = ?, date_debut = ?, date_fin = ? WHERE id_stage = ?',
        [entreprise, contact_nom, contact_email, nb_lettres_envoyees, nb_lettres_recues, date_entretien, resultat, date_debut, date_fin, id]
    );
};

/**
 * @description Supprime un stage
 * @param {number} id - Identifiant du stage à supprimer
 * @returns {Promise<void>}
 */
const remove = async (id) => {
    await db.query('DELETE FROM STAGE WHERE id_stage = ?', [id]);
};

module.exports = { getAll, getById, getByEleve, create, update, remove };