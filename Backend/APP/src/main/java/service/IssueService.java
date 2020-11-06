package service;

import models.ChatContentEntity;
import models.IssueEntity;
import org.json.simple.JSONObject;

import java.util.List;

public interface IssueService {
    /**
     * Get issue by id
     *
     * @param sessionId id of the issue
     * @return issue by id
     */
    IssueEntity getIssueById(int sessionId);

    /**
     * Get issue that is completed
     *
     * @param sessionId id of the issue
     * @return issue by id complete
     */
    List<JSONObject> getIssueByIdComplete(int sessionId);

    /**
     * Create an issue and match to client id
     *
     * @param clientId id of the client
     * @return created issue
     */
    Object createIssue(int clientId);

    /**
     * Get completed issue after inserting
     *
     * @return complete issue
     */
    Object getCompleteIssueAfterInsert();

    /**
     * Add an employee to an issue
     *
     * @param sessionId  id of the issue
     * @param employeeId id of the employee
     * @return employee added to issue
     */
    IssueEntity addEmployeeToIssue(int sessionId, int employeeId);

    /**
     * Set the current issue to solved
     *
     * @param sessionId id of the issue
     * @return issue is solved
     */
    IssueEntity setIssueSolved(int sessionId);

    /**
     * Get all the issues
     *
     * @return all issues
     */
    List<IssueEntity> getAllIssue();

    /**
     * Get all new issues
     *
     * @return all new issues
     */
    List<JSONObject> getAllNewIssues();

    /**
     * Get all open issues
     *
     * @return all open issues
     */
    List<JSONObject> getAllOpenIssues();

    /**
     * Get all closed issues
     *
     * @return all closed issue
     */
    List<JSONObject> getAllClosedIssues();

    /**
     * Get issue that is matched with employee id
     *
     * @param id id of the issue
     * @return issue by employeeid
     */
    List<Object> getIssueByEmployeeId(int id);

    /**
     * Get all open issues from the selected employee
     *
     * @return all open issues from employee
     */
    List<JSONObject> getAllOpenIssuesByEmployeeId(int employeeId);

    /**
     * Get all open issues from the selected client
     *
     * @return all open issues from client
     */
    List<JSONObject> getAllOpenIssuesByClientId(int clientId);

    /**
     * Get all closed issues from the selected client
     *
     * @return all closed issues from client
     */
    List<JSONObject> getAllClosedIssuesByClientId(int clientId);

    /**
     * Put message in database
     *
     * @return message in database
     */
    ChatContentEntity MessageToDatabase(String linetext, int sessionId);

    /**
     * Retrieve all chat history form the selected issue
     *
     * @return all chats in history
     */
    List<Object> getChatHistoryById(int id);

    /**
     * Get all open chats per employee of today
     *
     * @param employeeId id of the employee
     * @return all open chats per employee of today
     */
    Long getAllOpenChatsByEmployeeId(int employeeId);

    /**
     * Get all new chats per employee of today
     *
     * @param employeeId id of the employee
     * @return all new chats per employee of today
     */
    Long getAllNewChatsByEmployeeId(int employeeId);

    /**
     * Get all closed chats per employee of today
     *
     * @param employeeId id of the employee
     * @return all closed chats per employee of today
     */
    Long getAllClosedChatsByEmployeeId(int employeeId);
}
