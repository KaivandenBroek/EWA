package nl.hva.web.ziggo.Resources;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import nl.hva.web.ziggo.jwt.JWTUtils;
import service.RoleService;
import service.SecurityService;
import service.UserService;
import service.impl.RoleServiceImpl;
import service.impl.SecurityServiceImpl;
import service.impl.UserServiceImpl;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;
import java.util.Date;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;

@Path("login")
public class LoginResource {
    // define a final in is active for login
    private final int IS_ACTIVE = 1;
    // create some new objects
    private UserService userService;
    private SecurityService securityService;
    private RoleService roleService;

    // give objects the correct instance
    public LoginResource() {
        userService = UserServiceImpl.getInstance();
        securityService = SecurityServiceImpl.getInstance();
        roleService = RoleServiceImpl.getInstance();
    }

    /**
     * method to login
     *
     * @param username received from post call
     * @param password received from post call
     * @param uri      received from post call
     * @return login object for login user
     */
    @POST
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response authenticateUser(@FormParam("username") String username,
                                     @FormParam("password") String password,
                                     @Context UriInfo uri) {
        try {

            // Authenticate the user using the credentials provided
            // Note that we are using a hardcoded user and password
            // for the sake of simplicity

            if (!securityService.checkPassword(username, password)) {
                throw new IllegalAccessException();
            }
            // Issue1 a token for the user
            String token = issueToken(username, uri);
            // create user object to pass in Response
            Object user = userService.getUserObjectForLogin(username, token);
            //set active user
            userService.setActiveUser(username, IS_ACTIVE);
            // Return the token on the response
            return Response.status(Response.Status.OK).entity(user).header(AUTHORIZATION, "Bearer " + token).build();

        } catch (IllegalAccessException e) {
            return Response.status(UNAUTHORIZED).build();
        }
    }

    /**
     * method to create jwt token
     *
     * @param username received from login method
     * @param uri      received from login method
     * @return jwt token
     */
    private String issueToken(String username, UriInfo uri) {
        Key key = JWTUtils.getKey();

        // Could have more than one role, but now it is just one
        int roles = roleService.getRoles(username);

        String jwtToken = Jwts.builder()
                .setSubject(username)
                .claim("roleID", roles)
                .setIssuer(uri.getPath())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15 minutes
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return jwtToken;
    }

}

