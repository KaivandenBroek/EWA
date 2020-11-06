package service.impl;

import models.ChatContentEntity;
import models.IssueEntity;
import models.UserEntity;
import org.json.simple.JSONObject;
import service.IssueService;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

public class IssueServiceImpl implements IssueService {
    private static IssueServiceImpl issueService;

    // new static issueServiceImpl
    static {
        issueService = new IssueServiceImpl();
    }

    //create private values
    private EntityManagerFactory entityManagerFactory;
    //create hashMaps to write to and read from
    private Map<String, IssueEntity> issue;
    private Map<Integer, UserEntity> issueInt;

    //get Persistence
    private IssueServiceImpl() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
    }

    //generate Instance of IssueService
    public static IssueService getInstance() {
        return issueService;
    }

    //get EntityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * Method to get Issue by issue ID
     *
     * @param issueId id of the issue
     * @return issue by id
     */
    @Override
    public IssueEntity getIssueById(int issueId) {
        // get EntityManager
        EntityManager em = getEntityManager();
        // set IssueEntity null
        IssueEntity issue = null;
        // try to set a new IssueEntity by getting the Id
        try {
            issue = em.createQuery("SELECT u FROM IssueEntity u WHERE u.sessionId= :issueId", IssueEntity.class)
                    .setParameter("issueId", issueId).getSingleResult();
        } catch (IllegalArgumentException e) {
            //if no result is found throw exception
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }
        //return Issue Entity
        return issue;
    }


    /**
     * Method to get Issue by issue ID
     *
     * @param issueId id of the issue
     * @return issue by id
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getIssueByIdComplete(int issueId) {
        // get EntityManager
        EntityManager em = getEntityManager();
        // set IssueEntity null
        List<Object[]> issue = null;
        // try to set a new IssueEntity by getting the Id
        try {
            issue = em.createQuery("SELECT i.idUser, i.userByIdUser.username, i.date, i.idStatus, i.sessionId, i.idEmployee, i.userByIdEmployee.username FROM IssueEntity i WHERE i.sessionId= :issueId")
                    .setParameter("issueId", issueId).getResultList();
        } catch (IllegalArgumentException e) {
            //if no result is found throw exception
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }

        List<JSONObject> list = new ArrayList<>();

        for (Object[] line : issue) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("idUser", line[0]);
            jsonObject.put("username", line[1]);
            jsonObject.put("date", line[2]);
            jsonObject.put("idStatus", line[3]);
            jsonObject.put("sessionId", line[4]);
            jsonObject.put("idEmployee", line[5]);
            jsonObject.put("employeename", line[6]);

            list.add(jsonObject);
        }
        //return IssueComplete
        return list;
    }

    /**
     * Method to create issue by client
     *
     * @param clientId id of the client
     * @return created issue
     */
    @Override
    public Object createIssue(int clientId) {
        // get EntityManager
        EntityManager em = getEntityManager();
        // set final int for status new issue
        final int NEW_ISSUE = 4;
        // get current date in sql formate
        java.sql.Date sqlDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        // create new IssueEntity
        IssueEntity issueEntity = new IssueEntity();
        // set values for issueEntity
        issueEntity.setIdUser(clientId);
        issueEntity.setIdStatus(NEW_ISSUE);
        issueEntity.setDate(sqlDate);
        // try to set the new issueEntity in the database
        try {
            em.getTransaction().begin();

            em.persist(issueEntity);

            em.getTransaction().commit();
        } catch (RollbackException e) {
            //if rollback then print message
            e.getMessage();
            return null;
        } finally {
            // finally close entity manager
            em.close();
        }
        //return new issueEntity
        return getCompleteIssueAfterInsert();
    }

    /**
     * Method to get the completed issue after insert
     *
     * @return complete issue after insert
     */
    @Override
    public Object getCompleteIssueAfterInsert() {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object> list = new ArrayList<>();

        try {
            String query = "SELECT i.idUser, i.date, i.idStatus, i.sessionId FROM IssueEntity i order by i.sessionId desc";

            Query result = em.createQuery(query);

            List<Object[]> collection1 = result.setMaxResults(1).getResultList();

            for (Object[] line : collection1) {
                JSONObject json = new JSONObject();
                json.put("idUser", line[0]);
                json.put("date", line[1]);
                json.put("status", line[2]);
                json.put("sessionId", line[3]);

                list.add(json);
            }

        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();

        } finally {
            em.close();
        }
        return list.iterator().next();
    }

    /**
     * Method to add employee id to issue
     *
     * @param sessionId  id of the session
     * @param employeeId id of the employee
     * @return employee to issue
     */
    @Override
    public IssueEntity addEmployeeToIssue(int sessionId, int employeeId) {
        // get EntityManager
        EntityManager em = getEntityManager();
        // set final in for help status
        final int HELP_STATUS = 1;
        //get current issue by id
        IssueEntity currentIssue = issueService.getIssueById(sessionId);
        // if current issue is null return null
        if (currentIssue == null) {
            return null;
        }
        // set new status for current issue also add employee to issue
        currentIssue.setIdEmployee(employeeId);
        currentIssue.setIdStatus(HELP_STATUS);
        // try to set new values in database
        try {
            em.getTransaction().begin();

            em.merge(currentIssue);

            em.getTransaction().commit();

        } catch (RollbackException e) {
            // if rollback exception catch error and print message
            e.getMessage();
            return null;
        } finally {
            // close entity manager
            em.close();
        }
        // return current issue
        return currentIssue;
    }

    /**
     * Method to return all issues
     *
     * @return all issues
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<IssueEntity> getAllIssue() {
        // get EntityManager
        EntityManager em = getEntityManager();
        // create new list for issues and set null
        List<IssueEntity> issues = null;
        // try to get all issues from database
        try {
            issues = em.createQuery("SELECT u FROM IssueEntity u").getResultList();
        } catch (NoResultException | IllegalArgumentException e) {
            // catch no result or illegalArgument and print message
            e.getMessage();
            return null;
        } finally {
            //closing the entity manager
            em.close();
        }
        //returning the user
        return issues;
    }

    /**
     * Get all issues for employee id
     *
     * @param employeeId id of the employee
     * @return all issues for specific employee
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<Object> getIssueByEmployeeId(int employeeId) {
        //adding entity manager to the method
        EntityManager em = entityManagerFactory.createEntityManager();

        List<Object> list = null;

        try {
            String query = "SELECT u.sessionId, u.idStatus, u.date, u.idEmployee, u.idUser FROM IssueEntity u where u.idEmployee= :employeeId";

            Query issue = em.createQuery(query).setParameter("employeeId", employeeId);

            List<IssueEntity[]> collection1 = issue.getResultList();

            list = new ArrayList<>();

            for (Object[] line : collection1) {
                JSONObject json = new JSONObject();
                json.put("sessionId", line[0]);
                json.put("IssueStatus", line[1]);
                json.put("date", line[2]);
                json.put("employeeId", line[3]);
                json.put("clientId", line[4]);

                list.add(json);
            }

        } catch (NoResultException | IllegalArgumentException e) {
            e.getMessage();
        } finally {
            //closing the entity manager
            em.close();
        }
        return list;
    }

    /**
     * Get all the open issues by employee id
     *
     * @param employeeId id of the employee
     * @return all open issues by employee id
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getAllOpenIssuesByEmployeeId(int employeeId) {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object[]> issuesOpenByEmployee = null;

        try {
            issuesOpenByEmployee = em.createQuery("SELECT i.idUser, i.date, i.idStatus, i.sessionId, i.userByIdUser.username FROM IssueEntity i " +
                    " WHERE i.stateByIdStatus.idStatus = 1 AND i.userByIdEmployee.idUser = :id").setParameter("id", employeeId).getResultList();

        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();
            return null;
        } finally {
            em.close();
        }
        return getJsonObjects(issuesOpenByEmployee);
    }

    /**
     * Get all the open issues by client id
     *
     * @param clientId id of the client
     * @return all open issues by client id
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getAllOpenIssuesByClientId(int clientId) {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object[]> issuesOpenByClient = null;

        try {
            issuesOpenByClient = em.createQuery("SELECT i.idUser, i.date, i.idStatus, i.sessionId, i.userByIdUser.username FROM IssueEntity i " +
                    " WHERE i.stateByIdStatus.idStatus = 1 AND i.idUser = :id").setParameter("id", clientId).getResultList();

        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();
            return null;
        } finally {
            em.close();
        }
        return getJsonObjects(issuesOpenByClient);
    }

    /**
     * Get all closed issues by client id
     *
     * @param clientId id of the client
     * @return all closed issues by client id
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getAllClosedIssuesByClientId(int clientId) {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object[]> issuesClosedByClient = null;

        try {
            issuesClosedByClient = em.createQuery("SELECT i.idUser, i.date, i.idStatus, i.sessionId, i.userByIdUser.username FROM IssueEntity i " +
                    " WHERE i.stateByIdStatus.idStatus = 2 AND i.idUser = :id").setParameter("id", clientId).getResultList();

        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();
            return null;
        } finally {
            em.close();
        }
        return getJsonObjects(issuesClosedByClient);
    }

    /**
     * Put the message that is sent in the chat to the database
     *
     * @param linetext  line of text send by client or employee
     * @param sessionId id of the issue
     * @return message sent to database
     */
    public ChatContentEntity MessageToDatabase(String linetext, int sessionId) {
        // get EntityManager
        EntityManager em = getEntityManager();

        // create new chatContentEntity
        ChatContentEntity chatContentEntity = new ChatContentEntity();
        // get current date in sql formate
        java.sql.Timestamp sqlTime = new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());
        // set values for chatContentEntity
        chatContentEntity.setLinetext(linetext);
        chatContentEntity.setCreatedat(sqlTime);
        chatContentEntity.setSessionId(sessionId);
        // try to set the new chatContentEntity in the database
        try {
            em.getTransaction().begin();

            em.persist(chatContentEntity);

            em.getTransaction().commit();
        } catch (RollbackException e) {
            //if rollback then print message
            e.getMessage();
            return null;
        } finally {
            // finally close entity manager
            em.close();
        }
        //return new issueEntity
        return chatContentEntity;
    }

    /**
     * Get the chat history by id
     *
     * @param id id of the issue
     * @return chat history by id
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<Object> getChatHistoryById(int id) {
        //adding entity manager to the method
        EntityManager em = entityManagerFactory.createEntityManager();

        List<Object> content = null;

        try {
            String query = "SELECT c.idchatContent, c.linetext, c.sessionId FROM ChatContentEntity c where c.sessionId= :id";

            Query issue = em.createQuery(query).setParameter("id", id);

            List<IssueEntity[]> collection1 = issue.getResultList();

            content = new ArrayList<>();

            for (Object[] line : collection1) {
                ChatContentEntity c = new ChatContentEntity();
                c.setIdchatContent((Long) line[0]);
                c.setLinetext((String) line[1]);
                c.setSessionId((int) line[2]);

                content.add(c);
            }

        } catch (NoResultException | IllegalArgumentException e) {
            e.getMessage();
        } finally {
            //closing the entity manager
            em.close();
        }
        return content;
    }

    /**
     * Set the issue to solved
     *
     * @param sessionId id of the issue
     * @return issue set to solved
     */
    @Override
    public IssueEntity setIssueSolved(int sessionId) {
        EntityManager em = getEntityManager();

        final int SOLVED_STATUS = 2;

        IssueEntity currentIssue = issueService.getIssueById(sessionId);

        if (currentIssue == null) {
            return null;
        }
        currentIssue.setIdStatus(SOLVED_STATUS);

        try {
            em.getTransaction().begin();

            em.merge(currentIssue);

            em.getTransaction().commit();

        } catch (RollbackException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return currentIssue;
    }

    /**
     * Get all the new issues
     *
     * @return all new issues
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getAllNewIssues() {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object[]> issuesNew = null;

        try {
            issuesNew = em.createQuery("SELECT i.idUser, i.date, i.idStatus, i.sessionId, i.userByIdUser.username FROM IssueEntity i " +
                    "WHERE i.stateByIdStatus.idStatus = 4").getResultList();

        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();

        } finally {
            em.close();
        }
        return getJsonObjects(issuesNew);
    }

    /**
     * Get all the open issues
     *
     * @return all open issues
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getAllOpenIssues() {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object[]> issuesOpen = null;

        try {
            issuesOpen = em.createQuery("SELECT i.idUser, i.date, i.idStatus, i.sessionId, i.userByIdUser.username FROM IssueEntity i " +
                    " WHERE i.stateByIdStatus.idStatus = 1").getResultList();
        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();
            return null;
        } finally {
            em.close();
        }
        return getJsonObjects(issuesOpen);
    }

    /**
     * Get all the closed issues
     *
     * @return all closed issues
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<JSONObject> getAllClosedIssues() {
        // get EntityManager
        EntityManager em = getEntityManager();

        List<Object[]> issuesClosed = null;

        try {
            issuesClosed = em.createQuery("SELECT i.idUser, i.date, i.idStatus, i.sessionId, i.userByIdUser.username FROM IssueEntity i " +
                    " WHERE i.stateByIdStatus.idStatus = 2").getResultList();
        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();
            return null;
        } finally {
            em.close();
        }

        return getJsonObjects(issuesClosed);
    }

    /**
     * Get the json objects of a certain user
     *
     * @param issuesNew list of new issues
     * @return list os json objects of user
     */
    @SuppressWarnings("unchecked")
    private List<JSONObject> getJsonObjects(List<Object[]> issuesNew) {
        List<JSONObject> list = new ArrayList<>();

        for (Object[] line : issuesNew) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("idUser", line[0]);
            jsonObject.put("date", line[1]);
            jsonObject.put("idStatus", line[2]);
            jsonObject.put("sessionId", line[3]);
            jsonObject.put("username", line[4]);

            list.add(jsonObject);
        }

        return list;
    }

    /**
     * Get all open chats per employee of today
     *
     * @param employeeID id of the employee
     * @return all open chats per employee of today
     */
    @SuppressWarnings("unchecked")
    @Override
    public Long getAllOpenChatsByEmployeeId(int employeeID) {
        EntityManager em = getEntityManager();

        List<Long> employee = null;

        try {
            employee = em.createQuery("SELECT COUNT(i) FROM IssueEntity i WHERE i.date = current_date AND i.idStatus = 1 AND i.idEmployee = :employeeID")
                    .setParameter("employeeID", employeeID).getResultList();
        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return employee.iterator().next();
    }

    /**
     * Get all new chats per employee of today
     *
     * @param employeeID id of the employee
     * @return all new chats per employee of today
     */
    @SuppressWarnings("unchecked")
    @Override
    public Long getAllNewChatsByEmployeeId(int employeeID) {
        EntityManager em = getEntityManager();

        List<Long> employee = null;

        try {
            employee = em.createQuery("SELECT COUNT(i) FROM IssueEntity i WHERE i.date = current_date AND i.idStatus = 4 AND i.idEmployee = :employeeID")
                    .setParameter("employeeID", employeeID).getResultList();
        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return employee.iterator().next();
    }

    /**
     * Get all closed chats per employee of today
     *
     * @param employeeID id of the employee
     * @return all closed chats per employee of today
     */
    @SuppressWarnings("unchecked")
    @Override
    public Long getAllClosedChatsByEmployeeId(int employeeID) {
        EntityManager em = getEntityManager();

        List<Long> employee = null;

        try {
            employee = em.createQuery("SELECT COUNT(i) FROM IssueEntity i WHERE i.date = current_date AND i.idStatus = 2 AND i.idEmployee = :employeeID")
                    .setParameter("employeeID", employeeID).getResultList();
        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return employee.iterator().next();
    }


}
