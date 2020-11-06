package nl.hva.web.ziggo.Resources;

import models.ClientError;
import models.UserScoreEntity;
import service.ScoreService;
import service.impl.ScoreServiceImpl;

import javax.servlet.http.HttpServlet;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.CONFLICT;

@Path("score")
public class ScoreResource extends HttpServlet {
    private ScoreService scoreService;

    /**
     * get instance of ScoreServiceImpl
     */
    public ScoreResource() {
        scoreService = ScoreServiceImpl.getInstance();
    }

    /**
     * method to get the totalscore for an employee
     *
     * @param employeeID to receive the totalscore from
     * @return Response
     */
    @GET
    @Path("/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalEmployeeScore(@PathParam("employeeID") int employeeID) {
        //gets the total score for a specified employee.
        Double employee = scoreService.getTotalEmployeeScore(employeeID);
        // If employee is null, error not found. Else return ok and the employeeScore
        if (employee == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for employee " + employeeID)).build();

        } else {
            return Response.status(Response.Status.OK).entity(employee).build();
        }
    }

    /**
     * method to get the score for an employee
     *
     * @param employeeId to receive the totalscore from
     * @return List of employee with score and sessionId
     */
    @GET
    @Path("/getEmployeeScoreById/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEmployeeScore(@PathParam("employeeID") int employeeId) {
        List<Object> user = scoreService.getEmployeeScore(employeeId);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for employeeId" + employeeId)).build();

        } else {
            return Response.status(Response.Status.OK).entity(user).build();
        }
    }


    /**
     * method to post a score to an issue
     *
     * @param issue to give a score to
     * @param score to give an issue a rating
     * @return
     */
    @POST
    @Path("/testscore")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response giveScore(@FormParam("issue") int issue,
                              @FormParam("score") int score,
                              @Context UriInfo uri) {
        try {

            UserScoreEntity userScoreEntity = scoreService.clientGivesScore(issue, score);

            return Response.status(Response.Status.OK).entity(userScoreEntity).build();

        } catch (Exception e) {
            return Response.status(CONFLICT).build();
        }
    }
}
