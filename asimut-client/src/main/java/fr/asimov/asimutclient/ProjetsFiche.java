package fr.asimov.asimutclient;

import fr.asimov.asimutclient.api.ApiClient;
import fr.asimov.asimutclient.model.Eleve;
import fr.asimov.asimutclient.model.Projet;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.util.List;

public class ProjetsFiche {

    private final Eleve eleve;
    private final Stage owner;
    private final ObservableList<Projet> projetsEleve = FXCollections.observableArrayList();
    private final ObservableList<Projet> tousLesProjets = FXCollections.observableArrayList();
    private ListView<Projet> listeProjets;
    private ComboBox<Projet> comboProjets;

    public ProjetsFiche(Eleve eleve, Stage owner) {
        this.eleve = eleve;
        this.owner = owner;
    }

    public void show() throws Exception {
        Stage fenetre = new Stage();
        fenetre.setTitle("Projets — " + eleve.getPrenom() + " " + eleve.getNom());
        fenetre.initOwner(owner);

        // Liste des projets de l'élève
        listeProjets = new ListView<>(projetsEleve);
        listeProjets.setPrefHeight(200);

        Button btnSupprimer = new Button("✕ Retirer");
        btnSupprimer.setOnAction(e -> retirerProjet(fenetre));

        VBox blocListe = new VBox(8,
                new Label("Projets assignés :"),
                listeProjets,
                btnSupprimer
        );

        // Ajout d'un projet
        comboProjets = new ComboBox<>(tousLesProjets);
        comboProjets.setPromptText("Choisir un projet...");
        comboProjets.setPrefWidth(220);

        CheckBox checkResponsable = new CheckBox("Responsable");

        Button btnAjouter = new Button("+ Ajouter");
        btnAjouter.setOnAction(e -> ajouterProjet(checkResponsable.isSelected(), fenetre));

        HBox ligneAjout = new HBox(8, comboProjets, checkResponsable, btnAjouter);

        VBox blocAjout = new VBox(8,
                new Label("Ajouter un projet :"),
                ligneAjout
        );

        VBox root = new VBox(15, blocListe, new Separator(), blocAjout);
        root.setPadding(new Insets(15));

        fenetre.setScene(new Scene(root, 480, 380));
        fenetre.show();

        charger();
    }

    private void charger() {
        try {
            List<Projet> pe = ApiClient.getProjetsEleve(eleve.getId_eleve());
            projetsEleve.setAll(pe);

            List<Projet> tous = ApiClient.getProjets();
            // N'afficher dans le combo que les projets pas encore assignés
            List<Projet> disponibles = tous.stream()
                    .filter(p -> pe.stream().noneMatch(a -> a.getId_projet() == p.getId_projet()))
                    .collect(java.util.stream.Collectors.toList());
            tousLesProjets.setAll(disponibles);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void ajouterProjet(boolean estResponsable, Stage fenetre) {
        Projet choisi = comboProjets.getSelectionModel().getSelectedItem();
        if (choisi == null) return;
        try {
            ApiClient.addProjetEleve(eleve.getId_eleve(), choisi.getId_projet(), estResponsable ? 1 : 0);
            charger();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void retirerProjet(Stage fenetre) {
        Projet selectionne = listeProjets.getSelectionModel().getSelectedItem();
        if (selectionne == null) return;
        Alert confirm = new Alert(Alert.AlertType.CONFIRMATION,
                "Retirer « " + selectionne.getNom() + " » ?", ButtonType.YES, ButtonType.NO);
        confirm.showAndWait().ifPresent(rep -> {
            if (rep == ButtonType.YES) {
                try {
                    ApiClient.removeProjetEleve(eleve.getId_eleve(), selectionne.getId_projet());
                    charger();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}