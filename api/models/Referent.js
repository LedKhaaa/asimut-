/**
 * @file Referent.js
 * @description Modèle de données pour la table de liaison REFERENT (professeur-élève)
 * @author Ton nom
 */

const db = require('../database/db');

/**
 * @description Récupère toutes les affectations référent avec les détails professeur et élève
 * @returns {Promise<Array>} Liste de toutes les affectations avec noms et prénoms
 */
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

/**
 * @description Crée une affectation entre un professeur référent et un élève
 * @param {number} id_professeur - Identifiant du professeur
 * @param {number} id_eleve - Identifiant de l'élève
 * @returns {Promise<void>}
 */
const create = async (id_professeur, id_eleve) => {
    await db.query(
        'INSERT INTO REFERENT (id_professeur, id_eleve) VALUES (?, ?)',
        [id_professeur, id_eleve]
    );
};

/**
 * @description Supprime une affectation référent
 * @param {number} id_professeur - Identifiant du professeur
 * @param {number} id_eleve - Identifiant de l'élève
 * @returns {Promise<void>}
 */
const remove = async (id_professeur, id_eleve) => {
    await db.query(
        'DELETE FROM REFERENT WHERE id_professeur = ? AND id_eleve = ?',
        [id_professeur, id_eleve]
    );
};

module.exports = { getAll, create, remove };