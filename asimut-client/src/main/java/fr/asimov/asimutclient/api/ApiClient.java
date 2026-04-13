package fr.asimov.asimutclient.api;

import fr.asimov.asimutclient.model.Eleve;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import fr.asimov.asimutclient.model.Moyenne;
import fr.asimov.asimutclient.model.Projet;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class ApiClient {

    private static final String BASE_URL = "http://localhost:3000";
    private static final HttpClient client = HttpClient.newHttpClient();
    private static final Gson gson = new Gson();

    // GET /eleves — récupère tous les élèves
    public static List<Eleve> getEleves() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/eleves"))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        Type listType = new TypeToken<List<Eleve>>(){}.getType();
        return gson.fromJson(response.body(), listType);
    }

    // GET /eleves/:id — récupère un élève
    public static Eleve getEleve(int id) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/eleves/" + id))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return gson.fromJson(response.body(), Eleve.class);
    }

    // POST /eleves — créer un élève
    public static void createEleve(Eleve eleve) throws IOException, InterruptedException {
        String json = gson.toJson(eleve);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/eleves"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    // PUT /eleves/:id — modifier un élève
    public static void updateEleve(int id, Eleve eleve) throws IOException, InterruptedException {
        String json = gson.toJson(eleve);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/eleves/" + id))
                .header("Content-Type", "application/json")
                .PUT(HttpRequest.BodyPublishers.ofString(json))
                .build();

        client.send(request, HttpResponse.BodyHandlers.ofString());
    }

    // DELETE /eleves/:id — supprimer un élève
    public static void deleteEleve(int id) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/eleves/" + id))
                .DELETE()
                .build();

        client.send(request, HttpResponse.BodyHandlers.ofString());
    }// GET /eleves/:id/moyennes
    public static List<Moyenne> getMoyennes(int idEleve) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/eleves/" + idEleve + "/moyennes"))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        Type listType = new TypeToken<List<Moyenne>>(){}.getType();
        return gson.fromJson(response.body(), listType);
    }
    // GET /projets — tous les projets
    public static List<Projet> getProjets() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/projets"))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        Type listType = new TypeToken<List<Projet>>(){}.getType();
        return gson.fromJson(response.body(), listType);
    }

    // GET /projets/eleve/:id — projets d'un élève
    public static List<Projet> getProjetsEleve(int idEleve) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/projets/eleve/" + idEleve))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        Type listType = new TypeToken<List<Projet>>(){}.getType();
        return gson.fromJson(response.body(), listType);
    }

    // POST /projets/eleve/:id — ajouter un projet à un élève
    public static void addProjetEleve(int idEleve, int idProjet, int estResponsable) throws IOException, InterruptedException {
        String json = "{\"id_projet\":" + idProjet + ",\"est_responsable\":" + estResponsable + "}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/projets/eleve/" + idEleve))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("addProjetEleve réponse : " + response.statusCode() + " — " + response.body());
    }

    // DELETE /projets/eleve/:id/:id_projet — retirer un projet d'un élève
    public static void removeProjetEleve(int idEleve, int idProjet) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/projets/eleve/" + idEleve + "/" + idProjet))
                .DELETE()
                .build();

        client.send(request, HttpResponse.BodyHandlers.ofString());
    }
}