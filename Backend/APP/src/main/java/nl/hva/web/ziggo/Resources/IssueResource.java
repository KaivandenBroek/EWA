package nl.hva.web.ziggo.Resources;

import models.ChatContentEntity;
import models.ClientError;
import models.IssueEntity;
import org.json.simple.JSONObject;
import service.IssueService;
import service.impl.IssueServiceImpl;

import javax.persistence.RollbackException;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.CONFLICT;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;

/**
 * issue class to handle all in comming calls that have to do with issues
 */
@Path("issue")
public class IssueResource extends HttpServlet {
    // create object issueService
    private IssueService issueService;

    /**
     * get instance of issueServiceImpl
     */
    public IssueResource() {
        issueService = IssueServiceImpl.getInstance();
    }

    /**
     * method to return all issues
     *
     * @return returns all issues
     */
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<IssueEntity> getAllIssues() {
        return issueService.getAllIssue();
    }

    /**
     * method to get IssueById
     *
     * @param id is the session id received by url inside the get call
     * @return returns issue for specific id
     */
    @GET
    @Path("/issuebyid/{sessionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIssueById(@PathParam("sessionId") int id) {
        // call method in impl to handle the incomming issue call and return the IssueEntity object
        IssueEntity issue = issueService.getIssueById(id);
        // if specific issue is null respond with not found
        // else return true with correct issue object
        if (issue == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for id " + id)).build();
        } else {
            return Response.status(Response.Status.OK).entity(issue).build();
        }
    }

    /**
     * method to get a complete issue
     *
     * @param id is the session id received by url inside the get call
     * @return a complete issue
     */
    @GET
    @Path("/issuebyidcomplete/{sessionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getIssueByIdComplete(@PathParam("sessionId") int id) {
        return issueService.getIssueByIdComplete(id);
    }

    /**
     * method to get issue by Employee ID
     *
     * @param employeeId
     * @return
     */
    @GET
    @Path("/employeeid/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIssueEmployeeId(@PathParam("employeeID") int employeeId) {
        List<Object> issue = issueService.getIssueByEmployeeId(employeeId);

        if (issue == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for id " + employeeId)).build();
        } else {
            return Response.status(Response.Status.OK).entity(issue).build();
        }
    }

    /**
     * method to get all new issues
     *
     * @return all new issues
     */
    @GET
    @Path("/getallnew")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getAllNew() {
        return issueService.getAllNewIssues();
    }

    /**
     * method to get all open issues
     *
     * @return all open issues
     */
    @GET
    @Path("/getallopen")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getAllOpen() {
        return issueService.getAllOpenIssues();
    }

    /**
     * method to get chat for employee per date
     *
     * @param employeeID received by url
     * @return all employee open chats
     */
    @GET
    @Path("/getOpenEmployeeChat/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOpenChatsPerDatePerEmployee(@PathParam("employeeID") int employeeID) {
        Long employee = issueService.getAllOpenChatsByEmployeeId(employeeID);

        return Response.status(Response.Status.OK).entity(employee).build();
    }

    /**
     * method to get all new employeechats
     *
     * @param employeeID received from url
     * @return all employee new chats
     */
    @GET
    @Path("/getNewEmployeeChat/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNewChatsPerDatePerEmployee(@PathParam("employeeID") int employeeID) {
        Long employee = issueService.getAllNewChatsByEmployeeId(employeeID);

        return Response.status(Response.Status.OK).entity(employee).build();
    }

    /**
     * method to get all closed employeechats per date
     *
     * @param employeeID received from url
     * @return all closed employee chats
     */
    @GET
    @Path("/getClosedEmployeeChat/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClosedChatsPerDatePerEmployee(@PathParam("employeeID") int employeeID) {
        Long employee = issueService.getAllClosedChatsByEmployeeId(employeeID);

        return Response.status(Response.Status.OK).entity(employee).build();
    }

    /**
     * method to get all open for employee
     *
     * @param employeeId received from url
     * @return all open chats for employee
     */
    @GET
    @Path("/getallopenbyemployeeid/{employeeID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getAllOpenByEmployeeId(@PathParam("employeeID") int employeeId) {
        return issueService.getAllOpenIssuesByEmployeeId(employeeId);
    }

    /**
     * method to get all open chats for client
     *
     * @param clientId received from url
     * @return all open chats for client
     */
    @GET
    @Path("/getallopenbyclientid/{clientID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getAllOpenByClientId(@PathParam("clientID") int clientId) {
        return issueService.getAllOpenIssuesByClientId(clientId);
    }

    /**
     * method to get all closed by client id
     *
     * @param clientId received from url
     * @return all closed chats by client id
     */
    @GET
    @Path("/getallclosedbyclientid/{clientID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getAllClosedByClientId(@PathParam("clientID") int clientId) {
        return issueService.getAllClosedIssuesByClientId(clientId);
    }

    /**
     * method to get all closed chats
     *
     * @return all closed chats
     */
    @GET
    @Path("/getallclosed")
    @Produces(MediaType.APPLICATION_JSON)
    public List<JSONObject> getAllClosed() {
        return issueService.getAllClosedIssues();
    }

    /**
     * method to create a issue
     *
     * @param clientid received in post call
     * @return new issue id
     */
    @POST
    @Path("/createissue")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response createIssue(@FormParam("clientId") int clientid) {
        // try to create a new issue if fail catch rollback exception
        try {
            // new object to receive created issue
            Object newIssue = issueService.createIssue(clientid);
            // return new Issue
            return Response.status(Response.Status.OK).entity(newIssue).build();

        } catch (RollbackException e) {
            // if rollback return Unauthorized
            return Response.status(UNAUTHORIZED).build();
        }
    }

    /**
     * method to add employee to issue
     *
     * @param issueId    received in post call
     * @param employeeId received in post call
     * @return currentIssue
     */
    @POST
    @Path("/addemployeetoissue")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response addEmployeeToIssue(@FormParam("issueId") int issueId,
                                       @FormParam("employeeId") int employeeId) {
        // try to add a employee to the issue if fail catch the exception
        try {
            // add the employee to the issue by making use of created method and receive final object
            IssueEntity currentIssue = issueService.addEmployeeToIssue(issueId, employeeId);
            // return final issue
            return Response.status(Response.Status.OK).entity(currentIssue).build();

        } catch (Exception e) {
            // if exception return Conflict
            return Response.status(CONFLICT).build();
        }
    }

    /**
     * method to solve issue
     *
     * @param issueId received in post call
     * @return returns a solved issue
     */
    @POST
    @Path("/issuesolved")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response setIssueSolved(@FormParam("sessionId") int issueId) {
        // try to solve the issue by making use of the issueId if fail catch exception
        try {
            // solve current issue return object
            IssueEntity currentissue = issueService.setIssueSolved(issueId);
            // return solved issue
            return Response.status(Response.Status.OK).entity(currentissue).build();

        } catch (Exception e) {
            // if exception return Conflict
            return Response.status(CONFLICT).build();
        }
    }

    /**
     * method to put message to the database
     *
     * @param linetext  received from post call
     * @param sessionId received from post call
     * @return message to database
     */
    @POST
    @Path("/putmessage")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public ChatContentEntity messageToDatabase(@FormParam("linetext") String linetext,
                                               @FormParam("sessionId") int sessionId) {
        return issueService.MessageToDatabase(linetext, sessionId);

    }

    /**
     * method to get chathistory
     *
     * @param id received from post call
     * @return chat history
     */
    @GET
    @Path("/chathistorybyid/{sessionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChatHistoryById(@PathParam("sessionId") int id) {
        // get content object from method
        List<Object> content = issueService.getChatHistoryById(id);
        // if content is null chat content is not found return Not found if found return ok + content object
        if (content == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for id " + id)).build();
        } else {
            return Response.status(Response.Status.OK).entity(content).build();
        }
    }

}








