/**
 * @file Parent.js
 * @description Modèle de données pour la table PARENT
 * @author Ton nom
 */

const db = require('../database/db');

/**
 * @description Récupère tous les parents
 * @returns {Promise<Array>} Liste de tous les parents
 */
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM PARENT');
    return rows;
};

/**
 * @description Récupère un parent par son identifiant
 * @param {number} id - Identifiant du parent
 * @returns {Promise<object|undefined>} Le parent trouvé ou undefined
 */
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM PARENT WHERE id_parent = ?', [id]);
    return rows[0];
};

/**
 * @description Récupère l'élève associé à un parent
 * @param {number} id - Identifiant du parent
 * @returns {Promise<Array>} L'élève associé au parent
 */
const getEleves = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM ELEVE WHERE id_eleve = (SELECT id_eleve FROM PARENT WHERE id_parent = ?)',
        [id]
    );
    return rows;
};

/**
 * @description Crée un nouveau parent
 * @param {string} nom - Nom du parent
 * @param {string} prenom - Prénom du parent
 * @param {string} email - Email du parent
 * @param {number} id_eleve - Identifiant de l'élève associé
 * @returns {Promise<number>} Identifiant du parent créé
 */
const create = async (nom, prenom, email, id_eleve) => {
    const [result] = await db.query(
        'INSERT INTO PARENT (nom, prenom, email, id_eleve) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, id_eleve]
    );
    return result.insertId;
};

/**
 * @description Met à jour un parent
 * @param {number} id - Identifiant du parent à modifier
 * @param {string} nom - Nouveau nom
 * @param {string} prenom - Nouveau prénom
 * @param {string} email - Nouvel email
 * @param {number} id_eleve - Nouvel identifiant d'élève associé
 * @returns {Promise<void>}
 */
const update = async (id, nom, prenom, email, id_eleve) => {
    await db.query(
        'UPDATE PARENT SET nom = ?, prenom = ?, email = ?, id_eleve = ? WHERE id_parent = ?',
        [nom, prenom, email, id_eleve, id]
    );
};

/**
 * @description Supprime un parent
 * @param {number} id - Identifiant du parent à supprimer
 * @returns {Promise<void>}
 */
const remove = async (id) => {
    await db.query('DELETE FROM PARENT WHERE id_parent = ?', [id]);
};
const getByEleve = async (id_eleve) => {
    const [rows] = await db.query('SELECT * FROM PARENT WHERE id_eleve = ?', [id_eleve]);
    return rows;
};

const getAllAvecEleve = async () => {
    const [rows] = await db.query(`
        SELECT p.*, e.nom AS eleve_nom, e.prenom AS eleve_prenom
        FROM PARENT p
        JOIN ELEVE e ON p.id_eleve = e.id_eleve
    `);
    return rows;
};
module.exports = { getAll, getById, getEleves, create, update, remove, getByEleve, getAllAvecEleve };