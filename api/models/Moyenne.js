/**
 * @file Moyenne.js
 * @description Modèle de données pour la table MOYENNE
 * @author Ton nom
 */

const db = require('../database/db');

/**
 * @description Récupère toutes les moyennes d'un élève
 * @param {number} id_eleve - Identifiant de l'élève
 * @returns {Promise<Array>} Liste des moyennes de l'élève
 */
const getByEleve = async (id_eleve) => {
    const [rows] = await db.query('SELECT * FROM MOYENNE WHERE id_eleve = ?', [id_eleve]);
    return rows;
};

/**
 * @description Récupère une moyenne par son identifiant
 * @param {number} id - Identifiant de la moyenne
 * @returns {Promise<object|undefined>} La moyenne trouvée ou undefined
 */
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM MOYENNE WHERE id_moyenne = ?', [id]);
    return rows[0];
};

/**
 * @description Crée une nouvelle moyenne — saisie secrétariat uniquement, non modifiable après validation
 * @param {number} id_eleve - Identifiant de l'élève
 * @param {number} semestre - Semestre (1 ou 2)
 * @param {string} annee_scolaire - Année scolaire (ex: 2024-2025)
 * @param {number} valeur - Valeur de la moyenne (0 à 20)
 * @returns {Promise<number>} Identifiant de la moyenne créée
 */
const create = async (id_eleve, semestre, annee_scolaire, valeur) => {
    const [result] = await db.query(
        'INSERT INTO MOYENNE (id_eleve, semestre, annee_scolaire, valeur) VALUES (?, ?, ?, ?)',
        [id_eleve, semestre, annee_scolaire, valeur]
    );
    return result.insertId;
};

/**
 * @description Valide une moyenne — action réservée au proviseur uniquement
 * @param {number} id - Identifiant de la moyenne à valider
 * @returns {Promise<void>}
 */
const valider = async (id) => {
    await db.query('UPDATE MOYENNE SET validee = TRUE WHERE id_moyenne = ?', [id]);
};

/**
 * @description Supprime une moyenne
 * @param {number} id - Identifiant de la moyenne à supprimer
 * @returns {Promise<void>}
 */
const remove = async (id) => {
    await db.query('DELETE FROM MOYENNE WHERE id_moyenne = ?', [id]);
};

module.exports = { getByEleve, getById, create, valider, remove };