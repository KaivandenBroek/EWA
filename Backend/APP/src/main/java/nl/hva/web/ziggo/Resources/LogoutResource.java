package nl.hva.web.ziggo.Resources;

import service.UserService;
import service.impl.UserServiceImpl;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.OK;

@Path("logout")
public class LogoutResource {

    private UserService userService;

    /**
     * add correct instance userService object
     */
    public LogoutResource() {
        userService = UserServiceImpl.getInstance();
    }

    /**
     * method to logout a user
     *
     * @param username received from post call
     * @param uri      received from post call
     * @return status ok
     */
    @POST
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response authenticateUser(@FormParam("username") String username,
                                     @Context UriInfo uri) {
        // is not active is 0
        final int IS_NOT_ACTIVE = 0;
        //unset active user
        if (userService.setActiveUser(username, IS_NOT_ACTIVE)) {
            return Response.ok(OK).build();
        } else {
            return Response.status(Response.Status.CONFLICT).build();

        }

    }
}
