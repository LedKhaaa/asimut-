const db = require('../database/db');

const getAll = async () => {
    const [rows] = await db.query(`
        SELECT r.id_professeur, r.id_eleve,
               p.nom AS prof_nom, p.prenom AS prof_prenom, p.email AS prof_email,
               e.nom AS eleve_nom, e.prenom AS eleve_prenom
        FROM REFERENT r
        JOIN PROFESSEUR p ON r.id_professeur = p.id_professeur
        JOIN ELEVE e ON r.id_eleve = e.id_eleve
    `);
    return rows;
};

const getByProfesseur = async (id_professeur) => {
    const [rows] = await db.query(`
        SELECT e.id_eleve, e.nom, e.prenom, e.identifiant, e.id_classe
        FROM REFERENT r
        JOIN ELEVE e ON r.id_eleve = e.id_eleve
        WHERE r.id_professeur = ?
    `, [id_professeur]);
    return rows;
};

const affecter = async (id_professeur, id_eleve) => {
    await db.query(
        'INSERT INTO REFERENT (id_professeur, id_eleve) VALUES (?, ?)',
        [id_professeur, id_eleve]
    );
};

const desaffecter = async (id_professeur, id_eleve) => {
    await db.query(
        'DELETE FROM REFERENT WHERE id_professeur = ? AND id_eleve = ?',
        [id_professeur, id_eleve]
    );
};

const remove = async (id_professeur, id_eleve) => {
    await db.query(
        'DELETE FROM REFERENT WHERE id_professeur = ? AND id_eleve = ?',
        [id_professeur, id_eleve]
    );
};

const roundRobin = async () => {
    const [elevesRaw] = await db.query(`
        SELECT e.id_eleve FROM ELEVE e
        WHERE e.id_eleve NOT IN (SELECT id_eleve FROM REFERENT)
    `);

    if (elevesRaw.length === 0) return { affectes: 0 };

    const [profs] = await db.query('SELECT id_professeur FROM PROFESSEUR');
    if (profs.length === 0) return { affectes: 0 };

    const [comptes] = await db.query(`
        SELECT id_professeur, COUNT(*) as nb
        FROM REFERENT
        GROUP BY id_professeur
    `);

    const nbParProf = {};
    profs.forEach(p => nbParProf[p.id_professeur] = 0);
    comptes.forEach(c => nbParProf[c.id_professeur] = parseInt(c.nb));

    let i = 0;
    for (const eleve of elevesRaw) {
        const profId = [...profs].sort((a, b) =>
            nbParProf[a.id_professeur] - nbParProf[b.id_professeur]
        )[0].id_professeur;

        await affecter(profId, eleve.id_eleve);
        nbParProf[profId]++;
        i++;
    }

    return { affectes: i };
};

module.exports = { getAll, getByProfesseur, affecter, desaffecter, remove, roundRobin };