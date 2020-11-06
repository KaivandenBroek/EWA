package models;

import javax.persistence.*;

@Entity
@Table(name = "Score", schema = "zveermaz", catalog = "")
public class ScoreEntity {
    private int idScore;
    private int scoreName;

    @Id
    @Column(name = "idScore", nullable = false)
    public int getIdScore() {
        return idScore;
    }

    public void setIdScore(int idScore) {
        this.idScore = idScore;
    }

    @Basic
    @Column(name = "scoreName", nullable = false)
    public int getScoreName() {
        return scoreName;
    }

    public void setScoreName(int scoreName) {
        this.scoreName = scoreName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ScoreEntity that = (ScoreEntity) o;

        if (idScore != that.idScore) return false;
        if (scoreName != that.scoreName) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idScore;
        result = 31 * result + scoreName;
        return result;
    }
}
