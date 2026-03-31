/**
 * @file classe.test.js
 * @description Tests unitaires pour le modèle Classe
 */

const Classe = require('../models/Classe');
const db = require('../database/db');

afterAll(async () => {
    await db.end();
});

describe('Classe', () => {

    let idClasseTest;

    test('create() — doit créer une classe et retourner un id', async () => {
        const id = await Classe.create(6, 'Z', '2024-2025');
        expect(typeof id).toBe('number');
        expect(id).toBeGreaterThan(0);
        idClasseTest = id;
    });

    test('getAll() — doit retourner un tableau', async () => {
        const classes = await Classe.getAll();
        expect(Array.isArray(classes)).toBe(true);
        expect(classes.length).toBeGreaterThan(0);
    });

    test('getById() — doit retourner la bonne classe', async () => {
        const classe = await Classe.getById(idClasseTest);
        expect(classe).toBeDefined();
        expect(classe.niveau).toBe(6);
        expect(classe.lettre).toBe('Z');
    });

    test('update() — doit modifier la classe', async () => {
        await Classe.update(idClasseTest, 5, 'Z', '2024-2025');
        const classe = await Classe.getById(idClasseTest);
        expect(classe.niveau).toBe(5);
    });

    test('getById() — doit retourner undefined pour un id inexistant', async () => {
        const classe = await Classe.getById(99999);
        expect(classe).toBeUndefined();
    });

    test('getEleves() — doit retourner un tableau', async () => {
        const eleves = await Classe.getEleves(idClasseTest);
        expect(Array.isArray(eleves)).toBe(true);
    });

    test('remove() — doit supprimer la classe', async () => {
        await Classe.remove(idClasseTest);
        const classe = await Classe.getById(idClasseTest);
        expect(classe).toBeUndefined();
    });

});