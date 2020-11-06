package models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class UserScoreEntityPK implements Serializable {
    private int idUser;
    private int idScore;

    @Column(name = "idUser", nullable = false)
    @Id
    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    @Column(name = "idScore", nullable = false)
    @Id
    public int getIdScore() {
        return idScore;
    }

    public void setIdScore(int idScore) {
        this.idScore = idScore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserScoreEntityPK that = (UserScoreEntityPK) o;

        if (idUser != that.idUser) return false;
        if (idScore != that.idScore) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idUser;
        result = 31 * result + idScore;
        return result;
    }
}
