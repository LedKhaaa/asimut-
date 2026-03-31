/**
 * @file Classe.js
 * @description Modèle de données pour la table CLASSE
 */

const db = require('../database/db');

/**
 * @description Récupère toutes les classes
 * @returns {Promise<Array>} Liste de toutes les classes
 */
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM CLASSE');
    return rows;
};

/**
 * @description Récupère une classe par son identifiant
 * @param {number} id - Identifiant de la classe
 * @returns {Promise<object|undefined>} La classe trouvée ou undefined
 */
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM CLASSE WHERE id_classe = ?', [id]);
    return rows[0];
};

/**
 * @description Récupère les élèves d'une classe
 * @param {number} id - Identifiant de la classe
 * @returns {Promise<Array>} Liste des élèves de la classe
 */
const getEleves = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM ELEVE WHERE id_classe = ?',
        [id]
    );
    return rows;
};

/**
 * @description Crée une nouvelle classe
 * @param {number} niveau - Niveau de la classe (6 à 3)
 * @param {string} lettre - Lettre de la classe (A, B, C…)
 * @param {string} annee_scolaire - Année scolaire (ex: 2024-2025)
 * @returns {Promise<number>} Identifiant de la classe créée
 */
const create = async (niveau, lettre, annee_scolaire) => {
    const [result] = await db.query(
        'INSERT INTO CLASSE (niveau, lettre, annee_scolaire) VALUES (?, ?, ?)',
        [niveau, lettre, annee_scolaire]
    );
    return result.insertId;
};

/**
 * @description Met à jour une classe
 * @param {number} id - Identifiant de la classe à modifier
 * @param {number} niveau - Nouveau niveau
 * @param {string} lettre - Nouvelle lettre
 * @param {string} annee_scolaire - Nouvelle année scolaire
 * @returns {Promise<void>}
 */
const update = async (id, niveau, lettre, annee_scolaire) => {
    await db.query(
        'UPDATE CLASSE SET niveau = ?, lettre = ?, annee_scolaire = ? WHERE id_classe = ?',
        [niveau, lettre, annee_scolaire, id]
    );
};

/**
 * @description Supprime une classe
 * @param {number} id - Identifiant de la classe à supprimer
 * @returns {Promise<void>}
 */
const remove = async (id) => {
    await db.query('DELETE FROM CLASSE WHERE id_classe = ?', [id]);
};

module.exports = { getAll, getById, getEleves, create, update, remove };