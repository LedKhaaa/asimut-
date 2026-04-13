package fr.asimov.asimutclient;

import fr.asimov.asimutclient.api.ApiClient;
import fr.asimov.asimutclient.model.Eleve;
import fr.asimov.asimutclient.model.Moyenne;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.util.List;
import java.util.stream.Collectors;

public class MainApp extends Application {

    private ListView<Eleve> listView = new ListView<>();
    private ObservableList<Eleve> tousLesEleves = FXCollections.observableArrayList();
    private ObservableList<Eleve> elevesAffiches = FXCollections.observableArrayList();

    @Override
    public void start(Stage stage) {
        stage.setTitle("Asim'UT — Élèves");

        TextField champRecherche = new TextField();
        champRecherche.setPromptText("Rechercher un élève...");
        champRecherche.setPrefWidth(250);

        Button btnRecherche = new Button("🔍");
        HBox recherche = new HBox(8, champRecherche, btnRecherche);

        Button btnActualiser = new Button("Actualiser");
        Button btnAjouter    = new Button("Ajouter");
        Button btnSupprimer  = new Button("Supprimer");
        Button btnMoyennes   = new Button("📈 Moyennes");

        Button btnProjets = new Button("📋 Projets");
        HBox toolbar = new HBox(10, btnActualiser, btnAjouter, btnSupprimer, btnMoyennes, btnProjets);

        VBox top = new VBox(8, recherche, toolbar);
        top.setPadding(new Insets(10));

        listView.setItems(elevesAffiches);
        listView.setPrefHeight(400);

        VBox root = new VBox(top, listView);
        Scene scene = new Scene(root, 550, 520);
        stage.setScene(scene);
        stage.show();

        chargerEleves();

        btnActualiser.setOnAction(e -> chargerEleves());
        btnSupprimer.setOnAction(e -> supprimerEleve());
        btnAjouter.setOnAction(e -> ouvrirFormulaireAjout(stage));
        btnMoyennes.setOnAction(e -> ouvrirMoyennes(stage));
        btnProjets.setOnAction(e -> ouvrirProjets(stage));

        champRecherche.textProperty().addListener((obs, ancien, nouveau) -> filtrer(nouveau));
        btnRecherche.setOnAction(e -> filtrer(champRecherche.getText()));
    }

    private void filtrer(String texte) {
        if (texte == null || texte.isBlank()) {
            elevesAffiches.setAll(tousLesEleves);
        } else {
            String s = texte.toLowerCase();
            List<Eleve> filtres = tousLesEleves.stream()
                    .filter(e -> e.getNom().toLowerCase().contains(s) ||
                            e.getPrenom().toLowerCase().contains(s))
                    .collect(Collectors.toList());
            elevesAffiches.setAll(filtres);
        }
    }

    private void chargerEleves() {
        try {
            List<Eleve> liste = ApiClient.getEleves();
            tousLesEleves.setAll(liste);
            elevesAffiches.setAll(liste);
        } catch (Exception e) {
            afficherErreur("Impossible de contacter l'API.");
        }
    }

    private void supprimerEleve() {
        Eleve selectionne = listView.getSelectionModel().getSelectedItem();
        if (selectionne == null) {
            afficherErreur("Sélectionnez un élève dans la liste.");
            return;
        }
        Alert confirm = new Alert(Alert.AlertType.CONFIRMATION,
                "Supprimer " + selectionne + " ?", ButtonType.YES, ButtonType.NO);
        confirm.showAndWait().ifPresent(rep -> {
            if (rep == ButtonType.YES) {
                try {
                    ApiClient.deleteEleve(selectionne.getId_eleve());
                    chargerEleves();
                } catch (Exception e) {
                    afficherErreur("Erreur lors de la suppression.");
                }
            }
        });
    }

    private void ouvrirFormulaireAjout(Stage stage) {
        TextField champNom       = new TextField();
        TextField champPrenom    = new TextField();
        TextField champNaissance = new TextField();
        TextField champClasse    = new TextField();

        champNom.setPromptText("Nom");
        champPrenom.setPromptText("Prénom");
        champNaissance.setPromptText("Date de naissance (YYYY-MM-DD)");
        champClasse.setPromptText("ID Classe");

        Button btnValider = new Button("Créer");

        VBox form = new VBox(10,
                new Label("Nom"),       champNom,
                new Label("Prénom"),    champPrenom,
                new Label("Naissance"), champNaissance,
                new Label("ID Classe"), champClasse,
                btnValider
        );
        form.setPadding(new Insets(15));

        Stage fenetre = new Stage();
        fenetre.setTitle("Nouvel élève");
        fenetre.setScene(new Scene(form, 300, 280));
        fenetre.initOwner(stage);
        fenetre.show();

        btnValider.setOnAction(e -> {
            Eleve eleve = new Eleve();
            eleve.setNom(champNom.getText());
            eleve.setPrenom(champPrenom.getText());
            eleve.setDate_naissance(champNaissance.getText());
            try {
                eleve.setId_classe(Integer.parseInt(champClasse.getText()));
            } catch (NumberFormatException ex) {
                afficherErreur("ID Classe invalide.");
                return;
            }
            try {
                ApiClient.createEleve(eleve);
                fenetre.close();
                chargerEleves();
            } catch (Exception ex) {
                afficherErreur("Erreur lors de la création.");
            }
        });
    }

    private void ouvrirMoyennes(Stage stage) {
        Eleve selectionne = listView.getSelectionModel().getSelectedItem();
        if (selectionne == null) {
            afficherErreur("Sélectionnez un élève pour voir ses moyennes.");
            return;
        }


        try {
            List<Moyenne> moyennes = ApiClient.getMoyennes(selectionne.getId_eleve());
            System.out.println("Moyennes reçues : " + moyennes);

            if (moyennes.isEmpty()) {
                afficherErreur("Aucune moyenne pour cet élève.");
                return;
            }

            moyennes.sort((a, b) -> {
                int cmp = a.getAnnee_scolaire().compareTo(b.getAnnee_scolaire());
                return cmp != 0 ? cmp : Integer.compare(a.getSemestre(), b.getSemestre());
            });

            MoyenneChart chart = new MoyenneChart(selectionne, moyennes);
            chart.show(stage);

        } catch (Exception e) {
            e.printStackTrace();
            afficherErreur("Impossible de récupérer les moyennes.");
        }
    }

    private void afficherErreur(String message) {
        Alert alert = new Alert(Alert.AlertType.ERROR, message, ButtonType.OK);
        alert.showAndWait();
    }
    private void ouvrirProjets(Stage stage) {
        Eleve selectionne = listView.getSelectionModel().getSelectedItem();
        if (selectionne == null) {
            afficherErreur("Sélectionnez un élève pour voir ses projets.");
            return;
        }
        try {
            ProjetsFiche fiche = new ProjetsFiche(selectionne, stage);
            fiche.show();
        } catch (Exception e) {
            e.printStackTrace();
            afficherErreur("Impossible de récupérer les projets.");
        }
    }
    public static void main(String[] args) {
        launch(args);
    }
}