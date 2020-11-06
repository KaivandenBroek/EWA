package nl.hva.ewa;

import org.junit.Before;
import org.junit.Test;

import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class TestSocket {
    private WebSocketContainer container;
    private HelloEndpoint endpoint;

    @Before
    public void onInit () {
        this.container = ContainerProvider.getWebSocketContainer();
        this.endpoint = new HelloEndpoint();
    }

    @Test
    public void pingServer() throws URISyntaxException, IOException, DeploymentException, InterruptedException {
        //ws://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/CSE
        Session session = this.container.connectToServer(this.endpoint, new URI("ws://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/CSE"));
        this.endpoint.sendMessage("Hello from client");

        Thread.sleep(1000);
    }
}
