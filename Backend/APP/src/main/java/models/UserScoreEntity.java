package models;

import javax.persistence.*;

@Entity
@Table(name = "UserScore", schema = "zveermaz", catalog = "")
@IdClass(UserScoreEntityPK.class)
public class UserScoreEntity {
    private int idUser;
    private int idScore;
    private int sessionId;
    private UserEntity userByIdUser;
    private ScoreEntity scoreByIdScore;
    private IssueEntity issueBySessionId;

    @Id
    @Column(name = "idUser", nullable = false)
    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    @Id
    @Column(name = "idScore", nullable = false)
    public int getIdScore() {
        return idScore;
    }

    public void setIdScore(int idScore) {
        this.idScore = idScore;
    }

    @Basic
    @Column(name = "sessionId", nullable = false)
    public int getSessionId() {
        return sessionId;
    }

    public void setSessionId(int sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserScoreEntity that = (UserScoreEntity) o;

        if (idUser != that.idUser) return false;
        if (idScore != that.idScore) return false;
        if (sessionId != that.sessionId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idUser;
        result = 31 * result + idScore;
        result = 31 * result + sessionId;
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "idUser", referencedColumnName = "idUser", nullable = false, insertable = false, updatable = false)
    public UserEntity getUserByIdUser() {
        return userByIdUser;
    }

    public void setUserByIdUser(UserEntity userByIdUser) {
        this.userByIdUser = userByIdUser;
    }

    @ManyToOne
    @JoinColumn(name = "idScore", referencedColumnName = "idScore", nullable = false, insertable = false, updatable = false)
    public ScoreEntity getScoreByIdScore() {
        return scoreByIdScore;
    }

    public void setScoreByIdScore(ScoreEntity scoreByIdScore) {
        this.scoreByIdScore = scoreByIdScore;
    }

    @ManyToOne
    @JoinColumn(name = "sessionId", referencedColumnName = "sessionId", nullable = false, insertable = false, updatable = false)
    public IssueEntity getIssueBySessionId() {
        return issueBySessionId;
    }

    public void setIssueBySessionId(IssueEntity issueBySessionId) {
        this.issueBySessionId = issueBySessionId;
    }
}
