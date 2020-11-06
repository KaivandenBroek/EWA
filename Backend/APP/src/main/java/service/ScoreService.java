package service;

import models.IssueEntity;
import models.ScoreEntity;
import models.UserEntity;
import models.UserScoreEntity;

import java.util.List;

public interface ScoreService {
    /**
     * CLient can give score to employee
     *
     * @param issue issue being used
     * @param score score that is given
     * @return score given to employee
     */
    UserScoreEntity clientGivesScore(int issue, int score);

    /**
     * Receive score given by client
     *
     * @param issue    issue being
     * @param employee current employee
     * @param score    score given
     * @return employee receives total score
     */
    UserScoreEntity employeeReceivesScore(IssueEntity issue, UserEntity employee, ScoreEntity score);

    /**
     * Get employee score
     *
     * @param employeeID id of the employee
     * @return employee score
     */
    List<Object> getEmployeeScore(int employeeID);

    /**
     * Get total employee score
     *
     * @param employeeID id of the employee
     * @return total employee score
     */
    Double getTotalEmployeeScore(int employeeID);
}
