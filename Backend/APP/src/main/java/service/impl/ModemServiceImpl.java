package service.impl;

import models.ModemEntity;
import models.UserEntity;
import service.ModemService;

import javax.persistence.*;
import java.util.List;

public class ModemServiceImpl implements ModemService {
    private static ModemServiceImpl modemService;

    // new static ModemServiceImpl
    static {
        modemService = new ModemServiceImpl();
    }

    // create private variables
    private EntityManagerFactory entityManagerFactory;

    // get Persistance
    private ModemServiceImpl() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
    }

    // generate Instance of ModemService
    public static ModemService getInstance() {
        return modemService;
    }

    // get EntityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * Get all the modems
     *
     * @return all modems
     */
    @Override
    public List<ModemEntity> getAllModems() {
        EntityManager em = getEntityManager();

        List<ModemEntity> modems = null;
        try {
            modems = em.createQuery("SELECT m FROM ModemEntity m").getResultList();
        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }
        return modems;
    }

    /**
     * Method to add modem to a user
     *
     * @param username username of the client
     * @param modemId  modemId of the modem
     * @return add modem to user
     */
    @Override
    public UserEntity addModemToUser(String username, ModemEntity modemId) {
        EntityManager em = getEntityManager();

        UserEntity userEntity = UserServiceImpl.getInstance().getUserByUsername(username);

        userEntity.setModemByIdModem1(modemId);

        try {
            em.getTransaction().begin();

            em.merge(userEntity);

            em.getTransaction().commit();

        } catch (RollbackException | EntityNotFoundException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return userEntity;
    }

    /**
     * Get modem from user
     *
     * @param username username of the client
     * @return modem from user
     */
    @Override
    public ModemEntity getModemFromUser(String username) {
        UserEntity userEntity = UserServiceImpl.getInstance().getUserByUsername(username);

        return userEntity.getModemByIdModem1();
    }


}
