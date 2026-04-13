package fr.asimov.asimutclient.model;

public class Eleve {

    private int id_eleve;
    private String nom;
    private String prenom;
    private String date_naissance;
    private int id_classe;

    // Getters — pour lire les valeurs
    public int getId_eleve()           { return id_eleve; }
    public String getNom()             { return nom; }
    public String getPrenom()          { return prenom; }
    public String getDate_naissance()  { return date_naissance; }
    public int getId_classe()          { return id_classe; }

    // Setters — pour modifier les valeurs
    public void setNom(String nom)                        { this.nom = nom; }
    public void setPrenom(String prenom)                  { this.prenom = prenom; }
    public void setDate_naissance(String date_naissance)  { this.date_naissance = date_naissance; }
    public void setId_classe(int id_classe)               { this.id_classe = id_classe; }

    // Pour afficher un élève proprement (utilisé par JavaFX dans les listes)
    @Override
    public String toString() {
        return prenom + " " + nom;
    }
}