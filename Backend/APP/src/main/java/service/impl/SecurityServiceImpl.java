package service.impl;

import models.UserEntity;
import nl.hva.web.ziggo.hash.PasswordUtils;
import service.SecurityService;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class SecurityServiceImpl implements SecurityService {
    private static SecurityServiceImpl securityService;

    // new static SecuritySerivceImpl
    static {
        securityService = new SecurityServiceImpl();
    }

    // create private variables
    private EntityManagerFactory entityManagerFactory;

    // get Persistence
    private SecurityServiceImpl() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");

    }

    // get Instance of SecurityService
    public static SecurityService getInstance() {
        return securityService;
    }

    /**
     * Check if the password matches the username
     *
     * @param username username of the user
     * @param password password of the user
     * @return check password
     */
    @Override
    public boolean checkPassword(String username, String password) {
        UserServiceImpl userService = new UserServiceImpl();
        UserEntity userEntity = userService.getUserByUsername(username);
        if (userEntity != null) {
            String salt = userEntity.getSalt();

            String mySecurePassword = PasswordUtils.generateSecurePassword(password, salt);

            return userEntity.checkPassword(mySecurePassword);

        }
        return false;
    }

}
