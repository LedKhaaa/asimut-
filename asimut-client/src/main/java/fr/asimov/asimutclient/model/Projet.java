package fr.asimov.asimutclient.model;

public class Projet {

    private int id_projet;
    private String nom;
    private String description;
    private int valide;
    private String date_debut;
    private String date_fin;
    private int est_responsable;

    public int getId_projet()        { return id_projet; }
    public String getNom()           { return nom; }
    public String getDescription()   { return description; }
    public int getValide()           { return valide; }
    public String getDate_debut()    { return date_debut; }
    public String getDate_fin()      { return date_fin; }
    public int getEst_responsable()  { return est_responsable; }

    public void setId_projet(int id_projet)          { this.id_projet = id_projet; }
    public void setNom(String nom)                   { this.nom = nom; }
    public void setDescription(String description)   { this.description = description; }
    public void setValide(int valide)                { this.valide = valide; }
    public void setDate_debut(String date_debut)     { this.date_debut = date_debut; }
    public void setDate_fin(String date_fin)         { this.date_fin = date_fin; }
    public void setEst_responsable(int v)            { this.est_responsable = v; }

    @Override
    public String toString() {
        String label = nom;
        if (est_responsable == 1) label += " ⭐";
        if (valide == 0) label += " (en attente)";
        return label;
    }
}