package service;

public interface StatisticsService {
    /**
     * Give all solved issues
     */
    void getAllSolvedIssues();

    /**
     * Get all solved issues from specific employee
     *
     * @param employeeId
     */
    void getAllSolvedIssuesForEmployee(int employeeId);

    /**
     * Get all the open issues
     */
    void getAllOpenIssues();

    /**
     * Get all open issues from specific employee
     *
     * @param employeeId id of the employee
     */
    void getAllOpenIssuesForEmployee(int employeeId);

    /**
     * Get all new issues
     */
    void getAllNew();

    /**
     * Get all new issues from specific employee
     *
     * @param employeeId id of the employee
     */
    void getAllNewIssuesForEmployee(int employeeId);

    /**
     * Count scores
     *
     * @param scoreId given scoreid
     * @return counted scores
     */
    Object countedScores(int scoreId);

    /**
     * Get the counted scores for employee
     *
     * @param scoreId    id of the score
     * @param employeeId id of the employee
     * @return counted scores for employee
     */
    Object countedScoresForEmployee(int scoreId, int employeeId);

    /**
     * Return all
     *
     * @return return all
     */
    Object returnAll();


}


