package nl.hva.web.ziggo.config;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * basic application path
 */
@ApplicationPath("/api")
public class App extends Application {

    public App() {}

}