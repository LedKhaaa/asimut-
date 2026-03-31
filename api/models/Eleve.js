/**
 * @file Eleve.js
 * @description Modèle de données pour la table ELEVE
 * @author Ton nom
 */

const db = require('../database/db');

/**
 * @description Récupère tous les élèves de la base de données
 * @returns {Promise<Array>} Liste de tous les élèves
 */
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM ELEVE');
    return rows;
};

/**
 * @description Récupère un élève par son identifiant
 * @param {number} id - L'identifiant de l'élève
 * @returns {Promise<object|undefined>} L'élève trouvé ou undefined
 */
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM ELEVE WHERE id_eleve = ?', [id]);
    return rows[0];
};

/**
 * @description Crée un nouvel élève dans la base de données
 * @param {string} nom - Nom de l'élève
 * @param {string} prenom - Prénom de l'élève
 * @param {string} identifiant - Identifiant unique de l'élève
 * @param {number} id_classe - Identifiant de la classe de l'élève
 * @returns {Promise<number>} L'identifiant du nouvel élève créé
 */
const create = async (nom, prenom, identifiant, id_classe) => {
    const [result] = await db.query(
        'INSERT INTO ELEVE (nom, prenom, identifiant, id_classe) VALUES (?, ?, ?, ?)',
        [nom, prenom, identifiant, id_classe]
    );
    return result.insertId;
};

/**
 * @description Met à jour les informations d'un élève
 * @param {number} id - Identifiant de l'élève à modifier
 * @param {string} nom - Nouveau nom
 * @param {string} prenom - Nouveau prénom
 * @param {string} identifiant - Nouvel identifiant
 * @param {number} id_classe - Nouvel identifiant de classe
 * @returns {Promise<void>}
 */
const update = async (id, nom, prenom, identifiant, id_classe) => {
    await db.query(
        'UPDATE ELEVE SET nom = ?, prenom = ?, identifiant = ?, id_classe = ? WHERE id_eleve = ?',
        [nom, prenom, identifiant, id_classe, id]
    );
};

/**
 * @description Supprime un élève de la base de données
 * @param {number} id - Identifiant de l'élève à supprimer
 * @returns {Promise<void>}
 */
const remove = async (id) => {
    await db.query('DELETE FROM ELEVE WHERE id_eleve = ?', [id]);
};

module.exports = { getAll, getById, create, update, remove };