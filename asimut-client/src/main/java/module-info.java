module fr.asimov.asimutclient {
    requires javafx.controls;
    requires javafx.fxml;
    requires com.google.gson;
    requires java.net.http;

    opens fr.asimov.asimutclient to javafx.fxml;
    opens fr.asimov.asimutclient.model to com.google.gson, javafx.base;
    exports fr.asimov.asimutclient;
}