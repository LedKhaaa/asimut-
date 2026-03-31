/**
 * @file Professeur.js
 * @description Modèle de données pour la table PROFESSEUR
 * @author Ton nom
 */

const db = require('../database/db');

/**
 * @description Récupère tous les professeurs
 * @returns {Promise<Array>} Liste de tous les professeurs
 */
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM PROFESSEUR');
    return rows;
};

/**
 * @description Récupère un professeur par son identifiant
 * @param {number} id - Identifiant du professeur
 * @returns {Promise<object|undefined>} Le professeur trouvé ou undefined
 */
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM PROFESSEUR WHERE id_professeur = ?', [id]);
    return rows[0];
};

/**
 * @description Récupère les élèves dont le professeur est référent
 * @param {number} id - Identifiant du professeur
 * @returns {Promise<Array>} Liste des élèves référencés par ce professeur
 */
const getEleves = async (id) => {
    const [rows] = await db.query(
        'SELECT e.* FROM ELEVE e JOIN REFERENT r ON e.id_eleve = r.id_eleve WHERE r.id_professeur = ?',
        [id]
    );
    return rows;
};

/**
 * @description Crée un nouveau professeur
 * @param {string} nom - Nom du professeur
 * @param {string} prenom - Prénom du professeur
 * @param {string} email - Email du professeur
 * @returns {Promise<number>} Identifiant du professeur créé
 */
const create = async (nom, prenom, email) => {
    const [result] = await db.query(
        'INSERT INTO PROFESSEUR (nom, prenom, email) VALUES (?, ?, ?)',
        [nom, prenom, email]
    );
    return result.insertId;
};

/**
 * @description Met à jour un professeur
 * @param {number} id - Identifiant du professeur à modifier
 * @param {string} nom - Nouveau nom
 * @param {string} prenom - Nouveau prénom
 * @param {string} email - Nouvel email
 * @returns {Promise<void>}
 */
const update = async (id, nom, prenom, email) => {
    await db.query(
        'UPDATE PROFESSEUR SET nom = ?, prenom = ?, email = ? WHERE id_professeur = ?',
        [nom, prenom, email, id]
    );
};

/**
 * @description Supprime un professeur
 * @param {number} id - Identifiant du professeur à supprimer
 * @returns {Promise<void>}
 */
const remove = async (id) => {
    await db.query('DELETE FROM PROFESSEUR WHERE id_professeur = ?', [id]);
};

module.exports = { getAll, getById, getEleves, create, update, remove };