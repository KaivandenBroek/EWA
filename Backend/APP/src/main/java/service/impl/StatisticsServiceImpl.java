package service.impl;

import org.json.simple.JSONObject;
import service.StatisticsService;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class StatisticsServiceImpl implements StatisticsService {
    private static StatisticsServiceImpl statisticsService;

    // new static StatisticsServiceImpl
    static {
        statisticsService = new StatisticsServiceImpl();
    }

    // new JSON object
    JSONObject jsonObject = new JSONObject();
    // create private variables
    private EntityManagerFactory entityManagerFactory;

    // get Persistence
    private StatisticsServiceImpl() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
    }

    // get Instance of StatisticsService
    public static StatisticsService getInstance() {
        return statisticsService;
    }

    // get EntityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * Get all solved issues
     */
    @Override
    @SuppressWarnings("unchecked")
    public void getAllSolvedIssues() {
        final int SOLVED = 2;

        Object value = countedScores(SOLVED);

        jsonObject.put("getAllSolved", value);
    }

    /**
     * Get all solved issues for employee
     *
     * @param employeeId id of the employee
     */
    @Override
    @SuppressWarnings("unchecked")
    public void getAllSolvedIssuesForEmployee(int employeeId) {
        final int SOLVED = 2;

        Object value = countedScoresForEmployee(SOLVED, employeeId);

        jsonObject.put("getAllSolved", value);
    }

    /**
     * Get all open issues
     */
    @Override
    @SuppressWarnings("unchecked")
    public void getAllOpenIssues() {
        final int OPEN = 1;

        Object value = countedScores(OPEN);

        jsonObject.put("getAllOpen", value);
    }

    /**
     * Get all open issues for employee
     *
     * @param employeeId id of the employee
     */
    @Override
    @SuppressWarnings("unchecked")
    public void getAllOpenIssuesForEmployee(int employeeId) {
        final int OPEN = 1;

        Object value = countedScoresForEmployee(OPEN, employeeId);

        jsonObject.put("getAllOpen", value);
    }

    /**
     * Get all new issues
     */
    @Override
    @SuppressWarnings("unchecked")
    public void getAllNew() {
        final int NEW = 4;

        Object value = countedScores(NEW);

        jsonObject.put("getAllNew", value);
    }

    /**
     * Get all new issues for employee
     *
     * @param employeeId id of the employee
     */
    @Override
    @SuppressWarnings("unchecked")
    public void getAllNewIssuesForEmployee(int employeeId) {
        final int NEW = 4;

        Object value = countedScoresForEmployee(NEW, employeeId);

        jsonObject.put("getAllNew", value);
    }

    /**
     * Get counted scores
     *
     * @param scoreId id of the score
     * @return counted score
     */
    @Override
    @SuppressWarnings("unchecked")
    public Object countedScores(int scoreId) {
        EntityManager em = getEntityManager();

        java.sql.Date sqlDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        List<Long> object = null;

        try {
            object = em.createQuery("SELECT COUNT(u.idStatus) FROM IssueEntity u WHERE u.idStatus = :scoreId AND u.date = :date")
                    .setParameter("scoreId", scoreId).setParameter("date", sqlDate).getResultList();

        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();

        } finally {
            em.close();
        }

        return object.iterator().next();
    }

    /**
     * Get counted scored for employee
     *
     * @param scoreId    id of the score
     * @param employeeId id of the employee
     * @return counted score for employee
     */
    @Override
    @SuppressWarnings("unchecked")
    public Object countedScoresForEmployee(int scoreId, int employeeId) {
        EntityManager em = getEntityManager();

        List<Long> object = null;

        try {
            object = em.createQuery("SELECT COUNT(u.idStatus) FROM IssueEntity u WHERE u.idStatus = :scoreId AND u.idEmployee = :employeeId")
                    .setParameter("scoreId", scoreId).setParameter("employeeId", employeeId).getResultList();

        } catch (NullPointerException | IllegalArgumentException | NoResultException e) {
            e.getMessage();

        } finally {
            em.close();
        }

        return object.iterator().next();
    }

    /**
     * Return all issues
     *
     * @return all issues
     */
    @SuppressWarnings("unchecked")
    @Override
    public Object returnAll() {
        List listNew = new ArrayList();

        listNew.add(jsonObject);

        return listNew.iterator().next();
    }

}
