package service;

import models.UserEntity;

import java.util.List;

public interface UserService {
    /**
     * Get all users in a list
     *
     * @return all users
     */
    List<UserEntity> getAllUsers();

    /**
     * Method to get user by id
     *
     * @param userId id of the user
     * @return returns user by id
     */
    List<UserEntity> getUserById(int userId);

    /**
     * Method to get user for adjustment
     *
     * @param idUsers id of the users
     * @return returns user object
     */
    List<UserEntity> getUserForAdjustment(int idUsers);

    /**
     * method to edit client
     *
     * @param userId    id of the user
     * @param username  username of the user
     * @param firstName first name of the user
     * @param lastName  last name of the user
     * @return boolean value
     */
    Boolean editClient(int userId, String username, String firstName, String lastName, String email);

    /**
     * Method to get all clients
     *
     * @param roleID id of the role
     * @return returns all clients
     */
    List<UserEntity> getAllClients(int roleID);

    /**
     * Get user by id
     *
     * @param username username of the user
     * @return user by username
     */
    UserEntity getUserByUsername(String username);

    /**
     * Get single user by id
     *
     * @param userId id of the user
     * @return get single user by id
     */
    UserEntity getSingleUserById(int userId);

    /**
     * Add user to database
     *
     * @param user get user
     */
    void addUserToDatabase(UserEntity user);

    /**
     * Get user by user
     *
     * @param user get user
     * @return get user
     */
    UserEntity getUser(String user);

    /**
     * Check if user is employee
     *
     * @param userID id of the user
     * @return is employee
     */
    Boolean isEmployee(int userID);

    /**
     * Get user object for log in
     *
     * @param username received from call
     * @param token
     * @return user object for login
     */
    Object getUserObjectForLogin(String username, String token);

    /**
     * Get salt by username
     *
     * @param username username of the user
     * @return salt by username
     */
    UserEntity getSaltByUsername(String username);

    /**
     * Method to delete user from database
     *
     * @param userId id of the user
     */
    void deleteUserFromDatabase(int userId);

    /**
     * Method to set active user
     *
     * @param username username of the user
     * @param isActive if username is active
     * @return active user
     */
    Boolean setActiveUser(String username, int isActive);

    /**
     * Method to get all active things requested in query
     *
     * @param query query from method
     * @return all active by query
     */
    List<UserEntity> getAllActiveByQuery(String query);

    /**
     * Method to get all active employees
     *
     * @return returns all active employees
     */
    List<UserEntity> getAllActiveEmployees();

    /**
     * Method to get all active clients
     *
     * @return all active clients
     */
    List<UserEntity> getAllActiveClients();

    /**
     * Method to get all active users
     *
     * @return all active users
     */
    List<UserEntity> getAllActiveUsers();

    /**
     * Method to get all employees
     *
     * @return all employees
     */
    List<UserEntity> getAllEmployees();

}
