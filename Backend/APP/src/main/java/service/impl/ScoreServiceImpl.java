package service.impl;

import models.IssueEntity;
import models.ScoreEntity;
import models.UserEntity;
import models.UserScoreEntity;
import org.json.simple.JSONObject;
import service.ScoreService;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class ScoreServiceImpl implements ScoreService {
    private static ScoreServiceImpl scoreService;

    // new static ScoreServiceImpl
    static {
        scoreService = new ScoreServiceImpl();
    }

    // create private variables
    private EntityManagerFactory entityManagerFactory;

    // get Persistance
    private ScoreServiceImpl() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
    }

    // generate Instance of ScoreService
    public static ScoreService getInstance() {
        return scoreService;
    }

    // get EntityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * Get total employee score
     *
     * @param employeeID id of the employee
     * @return total employee score
     */
    @Override
    public Double getTotalEmployeeScore(int employeeID) {
        EntityManager em = getEntityManager();

        List<Double> employee = null;

        try {
            employee = em.createQuery("SELECT AVG(u.idScore) FROM UserScoreEntity u WHERE u.idUser= :employeeID")
                    .setParameter("employeeID", employeeID).getResultList();
        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return employee.iterator().next();
    }

    /**
     * Client gives score
     *
     * @param issue issue being used
     * @param score score that is given
     * @return client gives score to employee
     */
    @Override
    public UserScoreEntity clientGivesScore(int issue, int score) {
        EntityManager em = getEntityManager();

        IssueEntity currentIssue = null;
        UserEntity employee1 = null;

        try {
            String query = "SELECT i FROM IssueEntity i WHERE i.sessionId= :issue";

            currentIssue = em.createQuery(query, IssueEntity.class).setParameter("issue", issue).getSingleResult();

        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        }
        try {
            employee1 = currentIssue.getUserByIdEmployee();
        } catch (NullPointerException e) {
            e.getMessage();
        }
        UserScoreEntity userScoreEntity1 = new UserScoreEntity();

        userScoreEntity1.setIdScore(score);
        userScoreEntity1.setIdUser(employee1.getIdUser());
        userScoreEntity1.setSessionId(issue);

        try {
            em.getTransaction().begin();

            em.persist(userScoreEntity1);

            em.getTransaction().commit();

        } catch (RollbackException e) {
            e.getMessage();
        } finally {
            em.close();
        }

        return userScoreEntity1;
    }

    /**
     * Employee receives score from client
     *
     * @param issueEntity entity of issue
     * @param userEntity  entity of user
     * @param scoreEntity entity of score
     * @return employee receives score
     */
    @Override
    public UserScoreEntity employeeReceivesScore(IssueEntity issueEntity, UserEntity userEntity, ScoreEntity scoreEntity) {
        return null;
    }

    /**
     * Get employee score
     *
     * @param employeeID id of the employee
     * @return employee score
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<Object> getEmployeeScore(int employeeID) {
        EntityManager em = getEntityManager();

        List<Object> list = null;

        double average = 0;

        if (!UserServiceImpl.getInstance().isEmployee(employeeID)) {
            return null;
        }
        try {
            String query = ("SELECT u.idUser, u.idScore, u.issueBySessionId.sessionId" +
                    " FROM UserScoreEntity u WHERE u.userByIdUser.idUser= :employeeID");

            Query user = em.createQuery(query).setParameter("employeeID", employeeID);

            List<Object[]> collection = user.getResultList();
            list = new ArrayList<>();

            for (Object[] line : collection) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("idUser", line[0]);
                jsonObject.put("employeeScore", line[1]);
                jsonObject.put("issueId", line[2]);

                list.add(jsonObject);
            }
        } catch (StackOverflowError | IllegalArgumentException e) {
            e.getMessage();
        } finally {
            em.close();
        }
        return list;
    }

}
