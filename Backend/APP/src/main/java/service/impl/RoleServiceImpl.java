package service.impl;

import models.RoleEntity;
import models.UserEntity;
import service.RoleService;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import java.util.LinkedHashMap;
import java.util.Map;

public class RoleServiceImpl implements RoleService {
    private static RoleServiceImpl roleService;

    // new static RoleServiceImpl
    static {
        roleService = new RoleServiceImpl();
    }

    //initialize EntityManagerFactory and RepositoryServiceImpl
    private EntityManagerFactory entityManagerFactory;
    // create HashMaps to write and read from
    private Map<Integer, UserEntity> elements;
    private Map<String, UserEntity> users;
    private Map<Integer, UserEntity> usersbyID;
    //constructor for RepositoryServiceImpl
    private RoleServiceImpl() {
        //create entityManagerFactory
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");

        //create new LinkedHashMaps
        elements = new LinkedHashMap<>();
        users = new LinkedHashMap<>();
        usersbyID = new LinkedHashMap<>();
    }

    //  Method to get a reference to the instance (singleton)
    public static RoleService getInstance() {
        return roleService;
    }

    //get the entityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * Get roles
     *
     * @param username username of the user
     * @return roles
     */
    @Override
    public int getRoles(String username) {
        //create object user and get user by username
        UserEntity user = UserServiceImpl.getInstance().getUserByUsername(username);
        //if user returns null return 0
        if (user == null) {
            return 0;
        }
        //if user is not 0 return roleId
        return user.getRoleByRoleId().getRoleId();
    }

    /**
     * Get connected number to role
     *
     * @param username username of the user
     * @return connected number to role
     */
    @Override
    public RoleEntity connectedNumberToRole(String username) {
        //adding the entity manager to the method
        EntityManager em = getEntityManager();
        //creating a int roleid to store the roleid that belongs to the given username
        int roleId = getRoles(username);
        //create new object rolename and set value to null
        RoleEntity roleName = null;
        //if role id return 0 return null
        if (roleId == 0) {
            return null;
        } else {
            //if roleOd is valid try to find the role that goes along with that roleId
            //make use of int roleId received by getRoles method
            try {
                roleName = em.createQuery(
                        "SELECT u FROM RoleEntity u WHERE u.roleId = :roleId", RoleEntity.class)
                        .setParameter("roleId", roleId).getSingleResult();
                //if no result throw exception
            } catch (NoResultException e) {
                e.getMessage();
            }
            //close entity manager
            em.close();
            //return role name that belongs to the given rolId
            return roleName;

        }
    }

    /**
     * Get roleId
     *
     * @param roleEntity entity of role
     * @return roleId
     */
    @Override
    public RoleEntity getRoleId(RoleEntity roleEntity) {
        return null;
    }
}
