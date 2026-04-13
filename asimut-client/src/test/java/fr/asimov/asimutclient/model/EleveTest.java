package fr.asimov.asimutclient.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EleveTest {

    @Test
    void testGetNom() {
        Eleve eleve = new Eleve();
        eleve.setNom("DUPONT");
        assertEquals("DUPONT", eleve.getNom());
    }

    @Test
    void testGetPrenom() {
        Eleve eleve = new Eleve();
        eleve.setPrenom("Lucas");
        assertEquals("Lucas", eleve.getPrenom());
    }

    @Test
    void testGetDateNaissance() {
        Eleve eleve = new Eleve();
        eleve.setDate_naissance("2005-03-15");
        assertEquals("2005-03-15", eleve.getDate_naissance());
    }

    @Test
    void testGetIdClasse() {
        Eleve eleve = new Eleve();
        eleve.setId_classe(3);
        assertEquals(3, eleve.getId_classe());
    }

    @Test
    void testToString() {
        Eleve eleve = new Eleve();
        eleve.setNom("DUPONT");
        eleve.setPrenom("Lucas");
        assertEquals("Lucas DUPONT", eleve.toString());
    }
}