package nl.hva.web.ziggo.Resources;

import models.ClientError;
import models.RoleEntity;
import service.RoleService;
import service.impl.RoleServiceImpl;

import javax.servlet.http.HttpServlet;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/roles")
public class RoleResource extends HttpServlet {
    //initialize RoleService as roleService
    private RoleService roleService;

    /**
     * get instance of roleServiceImpl
     */
    public RoleResource() {
        roleService = RoleServiceImpl.getInstance();
    }

    /**
     * method to get Complete role
     *
     * @param username received from url
     * @return role for specific user
     */
    @GET
    @Path("/getRoleForUser/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByUsername(@PathParam("username") String username) {
        RoleEntity roleName = roleService.connectedNumberToRole(username);
// if roleName is null, handle with error not found. Else return ok and the roleName for specified user.
        if (roleName == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for rolename " + username)).build();

        } else {
            return Response.status(Response.Status.OK).entity(roleName).build();
        }
    }
}
