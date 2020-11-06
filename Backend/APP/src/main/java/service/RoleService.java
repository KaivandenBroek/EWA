package service;

import models.RoleEntity;

public interface RoleService {
    /**
     * Get all existing roles
     *
     * @param login login of the user
     * @return role of user
     */
    int getRoles(String login);

    /**
     * Connect number to role
     *
     * @param username of the user
     * @return connected number to role
     */
    RoleEntity connectedNumberToRole(String username);

    /**
     * Get roleId
     *
     * @param roleEntity entity of role
     * @return roleId
     */
    RoleEntity getRoleId(RoleEntity roleEntity);
}
