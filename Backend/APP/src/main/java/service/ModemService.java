package service;

import models.ModemEntity;
import models.UserEntity;

import java.util.List;

public interface ModemService {
    /**
     * Add a modem to a client
     *
     * @param username username of the client
     * @param modemId  modemId of the modem
     * @return modem to user
     */
    UserEntity addModemToUser(String username, ModemEntity modemId);

    /**
     * Get modem from the client
     *
     * @param username username of the client
     * @return modem by user
     */
    ModemEntity getModemFromUser(String username);

    /**
     * Get all the listed modems
     *
     * @return return all modems
     */
    List<ModemEntity> getAllModems();

}
