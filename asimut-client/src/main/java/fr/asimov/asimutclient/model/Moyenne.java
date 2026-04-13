package fr.asimov.asimutclient.model;

public class Moyenne {

    private int id_moyenne;
    private int id_eleve;
    private int semestre;
    private String annee_scolaire;
    private double valeur;
    private int validee;

    public int getId_moyenne()          { return id_moyenne; }
    public int getId_eleve()            { return id_eleve; }
    public int getSemestre()            { return semestre; }
    public String getAnnee_scolaire()   { return annee_scolaire; }
    public double getValeur()           { return valeur; }
    public int getValidee()             { return validee; }

    public void setSemestre(int semestre)              { this.semestre = semestre; }
    public void setAnnee_scolaire(String annee)        { this.annee_scolaire = annee; }
    public void setValeur(double valeur)               { this.valeur = valeur; }
    public void setValidee(int validee)                { this.validee = validee; }

    @Override
    public String toString() {
        return annee_scolaire + " S" + semestre + " : " + valeur;
    }
}