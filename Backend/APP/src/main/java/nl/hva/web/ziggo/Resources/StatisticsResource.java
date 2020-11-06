package nl.hva.web.ziggo.Resources;


import models.ClientError;
import service.StatisticsService;
import service.impl.StatisticsServiceImpl;

import javax.servlet.http.HttpServlet;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("stats")
public class StatisticsResource extends HttpServlet {

    private StatisticsService statsService;

    /**
     * get instance of StatisticsServiceImpl
     */
    public StatisticsResource() {
        statsService = StatisticsServiceImpl.getInstance();
    }

    /**
     * method to get all the issues
     *
     * @return Issue object
     */
    @GET
    @Path("/getallnew")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllNew() {
        // gets all the type of issues.
        statsService.getAllNew();
        statsService.getAllOpenIssues();
        statsService.getAllSolvedIssues();
        // create object of issues.
        Object getAllNew = statsService.returnAll();
        //if object is null give error. Else return ok and the issue object.
        if (getAllNew == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found")).build();
        } else {
            return Response.status(Response.Status.OK).entity(getAllNew).build();
        }
    }

    /**
     * method to receive an object of all the employee his issues
     *
     * @param employeeId to receive the issues from
     * @return Object of issues from specified employee
     */
    @GET
    @Path("/getallforemployee/{employeeId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllForEmployee(@PathParam("employeeId") int employeeId) {
        //get all the different type of issues.
        statsService.getAllSolvedIssuesForEmployee(employeeId);
        statsService.getAllNewIssuesForEmployee(employeeId);
        statsService.getAllOpenIssuesForEmployee(employeeId);
        // create new object with all the types of issues.
        Object getAllNew = statsService.returnAll();
        //if object is null give error. Else return ok and the issue object.
        if (getAllNew == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found")).build();
        } else {
            return Response.status(Response.Status.OK).entity(getAllNew).build();
        }
    }
}
