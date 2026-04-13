package fr.asimov.asimutclient;

import fr.asimov.asimutclient.model.Eleve;
import fr.asimov.asimutclient.model.Moyenne;
import javafx.scene.Scene;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.util.List;

public class MoyenneChart {

    private final Eleve eleve;
    private final List<Moyenne> moyennes;

    public MoyenneChart(Eleve eleve, List<Moyenne> moyennes) {
        this.eleve   = eleve;
        this.moyennes = moyennes;
    }

    public void show(Stage owner) {
        // Axes
        CategoryAxis xAxis = new CategoryAxis();
        NumberAxis   yAxis = new NumberAxis(0, 20, 2);

        xAxis.setLabel("Période");
        yAxis.setLabel("Moyenne");

        // Graphique
        LineChart<String, Number> chart = new LineChart<>(xAxis, yAxis);
        chart.setTitle("Moyennes de " + eleve.getPrenom() + " " + eleve.getNom());
        chart.setLegendVisible(false);

        // Données
        XYChart.Series<String, Number> serie = new XYChart.Series<>();
        for (Moyenne m : moyennes) {
            String label = m.getAnnee_scolaire() + " S" + m.getSemestre();
            serie.getData().add(new XYChart.Data<>(label, m.getValeur()));
        }
        chart.getData().add(serie);

        // Fenêtre
        VBox root = new VBox(chart);
        Stage fenetre = new Stage();
        fenetre.setTitle("Moyennes — " + eleve.getPrenom() + " " + eleve.getNom());
        fenetre.setScene(new Scene(root, 600, 400));
        fenetre.initOwner(owner);
        fenetre.show();
    }
}