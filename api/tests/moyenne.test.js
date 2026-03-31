/**
 * @file moyenne.test.js
 * @description Tests unitaires pour le modèle Moyenne
 */

const Moyenne = require('../models/Moyenne');
const Eleve = require('../models/Eleve');
const db = require('../database/db');

afterAll(async () => {
    await db.end();
});

describe('Moyenne', () => {

    let idEleveTest;
    let idMoyenneTest;

    // On crée un élève de test pour pouvoir lui associer des moyennes
    beforeAll(async () => {
        idEleveTest = await Eleve.create('TestMoy', 'Eleve', 'testmoy@test.com', 6, '2024-2025');
    });

    afterAll(async () => {
        await Eleve.remove(idEleveTest);
    });

    test('create() — doit créer une moyenne et retourner un id', async () => {
        const id = await Moyenne.create(idEleveTest, 1, '2024-2025', 14.5);
        expect(typeof id).toBe('number');
        expect(id).toBeGreaterThan(0);
        idMoyenneTest = id;
    });

    test('getByEleve() — doit retourner un tableau avec la moyenne créée', async () => {
        const moyennes = await Moyenne.getByEleve(idEleveTest);
        expect(Array.isArray(moyennes)).toBe(true);
        expect(moyennes.length).toBeGreaterThan(0);
    });

    test('getById() — doit retourner la bonne moyenne', async () => {
        const moyenne = await Moyenne.getById(idMoyenneTest);
        expect(moyenne).toBeDefined();
        expect(Number(moyenne.valeur)).toBe(14.5);
        expect(Number(moyenne.semestre)).toBe(1);
    });

    test('getById() — doit retourner undefined pour un id inexistant', async () => {
        const moyenne = await Moyenne.getById(99999);
        expect(moyenne).toBeUndefined();
    });

    test('valider() — doit passer validee à TRUE', async () => {
        await Moyenne.valider(idMoyenneTest);
        const moyenne = await Moyenne.getById(idMoyenneTest);
        expect(moyenne.validee).toBe(1); // MariaDB retourne 1 pour TRUE
    });

    test('remove() — doit supprimer la moyenne', async () => {
        await Moyenne.remove(idMoyenneTest);
        const moyenne = await Moyenne.getById(idMoyenneTest);
        expect(moyenne).toBeUndefined();
    });

});