package models;

import java.io.Serializable;

/**
 * A simple class representing a client error
 *
 * @author marciofk
 */
public class ClientError implements Serializable {

    private String message;

    public ClientError(String message) {
        setMessage(message);
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
