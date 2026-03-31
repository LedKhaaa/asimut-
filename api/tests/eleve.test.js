/**
 * @file eleve.test.js
 * @description Tests unitaires pour le modèle Eleve
 */

const Eleve = require('../models/Eleve');
const db = require('../database/db');

afterAll(async () => {
    await db.end();
});

describe('Eleve', () => {

    let idEleveTest;

    test('create() — doit créer un élève et retourner un id', async () => {
        const id = await Eleve.create('TEST', 'Unitaire', 'testunitaire', 1);
        expect(typeof id).toBe('number');
        expect(id).toBeGreaterThan(0);
        idEleveTest = id;
    });

    test('getAll() — doit retourner un tableau', async () => {
        const eleves = await Eleve.getAll();
        expect(Array.isArray(eleves)).toBe(true);
        expect(eleves.length).toBeGreaterThan(0);
    });

    test('getById() — doit retourner le bon élève', async () => {
        const eleve = await Eleve.getById(idEleveTest);
        expect(eleve).toBeDefined();
        expect(eleve.nom).toBe('TEST');
        expect(eleve.prenom).toBe('Unitaire');
    });

    test('update() — doit modifier l\'élève', async () => {
        await Eleve.update(idEleveTest, 'TEST', 'Modifié', 'testunitaire', 1);
        const eleve = await Eleve.getById(idEleveTest);
        expect(eleve.prenom).toBe('Modifié');
    });

    test('getById() — doit retourner undefined pour un id inexistant', async () => {
        const eleve = await Eleve.getById(99999);
        expect(eleve).toBeUndefined();
    });

    test('remove() — doit supprimer l\'élève', async () => {
        await Eleve.remove(idEleveTest);
        const eleve = await Eleve.getById(idEleveTest);
        expect(eleve).toBeUndefined();
    });

});