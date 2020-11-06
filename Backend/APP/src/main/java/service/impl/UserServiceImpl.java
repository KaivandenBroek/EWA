package service.impl;

import models.UserEntity;
import org.json.simple.JSONObject;
import service.UserService;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class UserServiceImpl implements UserService {
    private static UserServiceImpl userService;

    //declare new userService
    static {
        userService = new UserServiceImpl();
    }

    //initialize EntityManagerFactory and UserServiceImpl
    private EntityManagerFactory entityManagerFactory;
    // some mapping to make some things easier
    private Map<String, UserEntity> users;
    private Map<Integer, UserEntity> usersbyID;
    private Map<Integer, UserEntity> usersbyRoll;
    //constructor
    public UserServiceImpl() {
        //create entityManagerFactory
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
        //create new LinkedHashMaps
        users = new LinkedHashMap<>();
        usersbyID = new LinkedHashMap<>();
        usersbyRoll = new LinkedHashMap<>();
    }

    //  Method to get a reference to the instance (singleton)
    public static UserService getInstance() {
        return userService;
    }

    //get the entityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * method to get all users
     *
     * @return returns a list of all users
     */
    @SuppressWarnings("unchecked")
    @Override
    //method to get all users and transfer them to a List
    public List<UserEntity> getAllUsers() {
        //adding entity manager to the method
        EntityManager em = entityManagerFactory.createEntityManager();
        //create the List to add all found users to by making use of the query
        List<UserEntity> users =
                em.createQuery("SELECT u FROM UserEntity u").getResultList();
        //closing the entity manager
        em.close();
        //returning the user
        return users;
    }

    /**
     * method to return all employees
     *
     * @return returns a list of all employees
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<UserEntity> getAllEmployees() {
        //adding entity manager to the method

        EntityManager em = entityManagerFactory.createEntityManager();
        final int ROLE_ID = 2;
        //create the List to add all found users to by making use of the query
        List<UserEntity> employees =
                em.createQuery("SELECT u FROM UserEntity u where u.roleByRoleId.roleId = :roleId")
                        .setParameter("roleId", ROLE_ID).getResultList();
        //closing the entity manager
        em.close();
        //returning the user
        return employees;
    }

    /**
     * method to get all clients
     *
     * @param roleID roleId received from get or post call
     * @return return all clients in a list
     */
    @SuppressWarnings("unchecked")
    @Override
    // method to get all clients
    public List<UserEntity> getAllClients(int roleID) {
        //adding entity manager to the method
        EntityManager em = entityManagerFactory.createEntityManager();
        //create the List to add all found clients
        List<UserEntity> users = null;
        //try catch finally block
        try {
            users = em.createQuery("SELECT u FROM UserEntity u WHERE u.roleByRoleId.roleId = :roleID")
                    .setParameter("roleID", roleID).getResultList();
        } catch (NoResultException e) {
            //throw exception
            e.getMessage();
        } finally {
            //close Entity manager
            em.close();
        }
        //return list of all clients
        return users;
    }

    /**
     * get UserById
     *
     * @param idUsers received from call
     * @return return User
     */
    @SuppressWarnings("unchecked")
    @Override
    //method to get a user by Id
    public List<UserEntity> getUserById(int idUsers) {
        //adding the entity manager to the method
        EntityManager em = getEntityManager();
        //creating a object user and setting the value to null
        List<UserEntity> user = null;
        //trying to request user data by making use of a query
        //the query receives the given user id to locate a user
        try {
            user = em.createQuery("SELECT u FROM UserEntity u WHERE u.idUser= :idUsers")
                    .setParameter("idUsers", idUsers).getResultList();
            //if no result is found throw exception
        } catch (IllegalArgumentException e) {
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }
        //add user id + user object to the linkedHashMap usersByID
        //return user object
        return user;
    }

    /**
     * method to get a specific user by Id
     *
     * @param idUsers received from call
     * @return returns user for adjustment
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<UserEntity> getUserForAdjustment(int idUsers) {
        //adding the entity manager to the method
        EntityManager em = getEntityManager();
        //declare a String for the query
        String queryText = "SELECT u.idUser, u.username, u.firstName, u.lastName, u.email FROM UserEntity u WHERE u.idUser= :idUsers";
        //creating a object user and setting the value to null
        List<UserEntity> user = new ArrayList<>();
        //try catch finally block
        try {
            //Query 4 values listed in the above declared string set parameter idUsers
            Query query = em.createQuery(queryText).setParameter("idUsers", idUsers);
            //put result list inside a collection of Object array
            List<Object[]> collection = query.getResultList();
            //Loop true the whole thing with a for each loop
            for (Object[] line : collection) {
                //create new User Entity
                UserEntity userEntity = new UserEntity();
                // set value 1
                userEntity.setIdUser((Integer) line[0]);
                // set value 2
                userEntity.setUsername((String) line[1]);
                // set value 3
                userEntity.setFirstName((String) line[2]);
                // set value 4
                userEntity.setLastName((String) line[3]);
                // set value 5
                userEntity.setEmail((String) line[4]);
                // add object to list
                user.add(userEntity);
            }
        } catch (IllegalArgumentException | NoResultException e) {
            //if no result is found throw exception
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }
        //return user object
        return user;
    }

    /**
     * method to edit a user
     *
     * @param userId    received from call
     * @param username  received from call
     * @param firstName received from call
     * @param lastName  received from call
     * @return returns boolean value
     */
    @Override
    public Boolean editClient(int userId, String username, String firstName, String lastName, String email) {
        //Receive Entity Manager
        EntityManager em = getEntityManager();
        //get userEntity for current user by ID
        UserEntity userEntity = getSingleUserById(userId);
        //add new or old username
        userEntity.setUsername(username);
        //add new or old firstname
        userEntity.setFirstName(firstName);
        //add new or old lastName
        userEntity.setLastName(lastName);
        // add new or old email
        userEntity.setEmail(email);

        //try catch finally block
        try {
            //start transaction
            em.getTransaction().begin();
            //merge new userEntity with old one
            em.merge(userEntity);
            //commit transAction
            em.getTransaction().commit();

        } catch (RollbackException | IllegalArgumentException e) {
            //catch Exceptions and return message
            e.getMessage();
            //return false when catch is thrown
            return false;
        } finally {
            //finally close EntityManager
            em.close();
        }
        //return true if success
        return true;
    }

    /**
     * method get user by username
     *
     * @param username received from call
     * @return user object
     */
    @Override
    public UserEntity getUserByUsername(String username) {
        //adding the entity manager to the method
        EntityManager em = getEntityManager();
        //Creating a object user and setting the value to null
        UserEntity user = null;
        //try to get the user by the username
        //the query receives the given username to locate a user
        try {
            user = em.createQuery(
                    "SELECT u FROM UserEntity u WHERE u.username = :username", UserEntity.class)
                    .setParameter("username", username).getSingleResult();
            //if no result is found throw exception
        } catch (NoResultException e) {
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }

        //add user id + user object to the linkedHashMap users
        users.put(username, user);
        //return user object
        return user;
    }

    /**
     * method to get SingleUserById just the userEntity class
     *
     * @param userId received from call
     * @return returns single user object
     */
    @Override
    public UserEntity getSingleUserById(int userId) {
        //adding the entity manager to the method
        EntityManager em = getEntityManager();
        //creating a object user and setting the value to null
        UserEntity user = null;
        //trying to request user data by making use of a query
        //the query receives the given user id to locate a user
        try {
            user = em.createQuery("SELECT u FROM UserEntity u WHERE u.idUser= :userId", UserEntity.class)
                    .setParameter("userId", userId).getSingleResult();
            //if no result is found throw exception
        } catch (IllegalArgumentException e) {
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }

        //add user id + user object to the linkedHashMap usersByID
        //return user object
        return user;
    }

    /**
     * method to add user to db
     *
     * @param user received from register method
     */
    @Override
    //method to add User to database
    public void addUserToDatabase(UserEntity user) {
        //call the persistence file
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
        //create the entityManager
        EntityManager em = entityManagerFactory.createEntityManager();
        //try catch finally block
        try {
            //start transaction
            em.getTransaction().begin();
            //pass user to transaction
            em.persist(user);
            //commit transaction
            em.getTransaction().commit();
        } catch (RollbackException e) {
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }

        entityManagerFactory.close();
    }

    /**
     * method to delete a user from the db
     *
     * @param userId received from call
     */
    @Override
    //method to delete user from database by id
    public void deleteUserFromDatabase(int userId) {
        //call the persistence file
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
        //create the entityManager
        EntityManager em = entityManagerFactory.createEntityManager();
        UserEntity users = em.find(UserEntity.class, userId);
        //start transaction
        em.getTransaction().begin();
        //pass user to transaction
        em.remove(users);
        //commit transaction
        em.getTransaction().commit();
        //close entity manager
        em.close();
        entityManagerFactory.close();
    }

    /**
     * method to get user object for login
     *
     * @param username received from login
     * @param token    received by jwt token
     * @return returns user object for login
     */
    @SuppressWarnings("unchecked")
    @Override
    public Object getUserObjectForLogin(String username, String token) {
        // get Entity manager
        EntityManager em = getEntityManager();
        // declare String query
        String query = ("SELECT idUser, username, roleByRoleId.roleId FROM UserEntity u WHERE u.username = :username");
        // query the above stated query with parameter username
        Query user = em.createQuery(query).setParameter("username", username);
        // create a list to add query result
        List<Object[]> collection1 = user.getResultList();
        // new list to add new jsonobject to
        List<Object> list = new ArrayList<>();
        // for each loop to go over the result
        for (Object[] line : collection1) {
            // new JSON Object
            JSONObject json = new JSONObject();// new value 1
            json.put("idUser", line[0]);
            // new value 2
            json.put("username", line[1]);
            // new value 3
            json.put("roleId", line[2]);
            // new value 4
            json.put("jwtToken", token);
            // add json object
            list.add(json);
        }
        // return single object by making use of iterator
        return list.iterator().next();
    }

    /**
     * get salt for username to make sure he or she is able to login
     *
     * @param username received from call
     * @return returns salt
     */
    @SuppressWarnings("unchecked")
    @Override
    public UserEntity getSaltByUsername(String username) {
        // receive entity manager
        EntityManager em = getEntityManager();
        // query
        String query = ("SELECT salt FROM UserEntity u WHERE u.username = :username");
        // do query with username as parameter
        Query query1 = em.createQuery(query).setParameter("username", username);
        // get result list
        List<Object[]> collection1 = query1.getResultList();
        // create new UserEntity list
        List<UserEntity> list = new ArrayList<>();
        // loop over object to put them in the created list
        for (Object[] line : collection1) {
            UserEntity userEntity = new UserEntity();
            userEntity.setSalt((String) line[0]);
            // add object to list
            list.add(userEntity);
        }
        // return list while iterating over it
        return list.iterator().next();
    }

    /**
     * get user by username method is called
     *
     * @param user received from call
     * @return return user by username
     */
    @Override
    public UserEntity getUser(String user) {
        return getUserByUsername(user);
    }

    /**
     * method to check if user is emplyee
     *
     * @param userID received from call
     * @return returns true or false
     */
    @Override
    public Boolean isEmployee(int userID) {
        // calls new method to get user object
        UserEntity userEntity = getSingleUserById(userID);
        // check if user is employee and return
        return userEntity.getRoleByRoleId().getName().equals("Employee");
    }

    /**
     * method to set active user after login
     *
     * @param username received by login
     * @param isActive static value
     * @return return boolean
     */
    @Override
    public Boolean setActiveUser(String username, int isActive) {
        // receive entity manager
        EntityManager em = getEntityManager();
        // get userEntity by username
        UserEntity userEntity = getUserByUsername(username);
        // check if userEntity is null or not
        if (userEntity == null) {
            return false;
        }
        // set active or inActive value
        userEntity.setIsActive(isActive);
        // try catch rollback Exception
        try {
            // start transaction
            em.getTransaction().begin();
            // merge userEntity with new value
            em.merge(userEntity);
            // commit transaction
            em.getTransaction().commit();
            // return true if success
            return true;

        } catch (RollbackException e) {
            // get message
            e.getMessage();
        } finally {
            // always close entity manager
            em.close();
        }
        // when fail return false
        return false;
    }

    /**
     * get all active employees
     *
     * @return all active employees
     */
    @Override
    public List<UserEntity> getAllActiveEmployees() {
        String query = ("SELECT idUser, username FROM UserEntity WHERE isActive = 1 AND roleByRoleId.roleId = 2");

        return getAllActiveByQuery(query);
    }

    /**
     * get all active clients
     *
     * @return all active clients
     */
    @Override
    public List<UserEntity> getAllActiveClients() {
        String query = ("SELECT idUser, username FROM UserEntity WHERE isActive = 1 AND roleByRoleId.roleId = 3");

        return getAllActiveByQuery(query);
    }

    /**
     * get all active users
     *
     * @return return all active users
     */
    @Override
    public List<UserEntity> getAllActiveUsers() {
        String query = ("SELECT idUser, username FROM UserEntity WHERE isActive = 1");

        return getAllActiveByQuery(query);
    }

    /**
     * query for above stated method to get all active x
     *
     * @param query received from method
     * @return returns list
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<UserEntity> getAllActiveByQuery(String query) {
        // get entity manager
        EntityManager em = getEntityManager();
        // create query received from method
        Query query1 = em.createQuery(query);
        // get result list from query
        List<Object[]> collection1 = query1.getResultList();
        // create new list to add values to
        List<UserEntity> list = new ArrayList<>();
        // for each loop over the list of objects
        for (Object[] line : collection1) {
            // new userEntity object
            UserEntity userEntity = new UserEntity();
            // set value 1
            userEntity.setIdUser((int) line[0]);
            // set value 2
            userEntity.setUsername((String) line[1]);
            // add object to list
            list.add(userEntity);
        }
        // return list while iterating over it
        return list;
    }
}
