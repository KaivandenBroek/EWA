package nl.hva.web.ziggo;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@ServerEndpoint(value = "/api/CSE")
public class ChatroomServerEndpoint {

    /**
     * a list for the users on a server
     */
    private static Set<Session> chatRoomUsers = Collections.synchronizedSet(new HashSet<Session>());

    /**
     * method to create a new session when new users join the server
     */
    @OnOpen
    public void handleOpen(Session userSession) {
        System.out.println("new connection...");
        chatRoomUsers.add(userSession);
    }

    /**
     * method to broadcast the message on the serverendpoint, so that the frontend can read it
     */
    @OnMessage
    public void onTextMessage(String message) {
        System.out.println("Message =" + message);
        Iterator<Session> iterator = chatRoomUsers.iterator();
        while (iterator.hasNext()) {
            try {
                iterator.next().getBasicRemote().sendObject(message);
            } catch (Throwable e) {
                e.printStackTrace();
                iterator.remove();
            }
        }
    }

    /**
     * method to close the connection
     */
    @OnClose
    public void handleClose(Session userSession) {
        System.out.println("connection closed...");
        chatRoomUsers.remove(userSession);
    }

    /**
     * method to print the error if exists
     */
    @OnError
    public void onError(Throwable e) {
        e.printStackTrace();
    }
}