package models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "Issue", schema = "zveermaz", catalog = "")
public class IssueEntity {
    private int sessionId;
    private int idStatus;
    private Integer idUser;
    private Integer idEmployee;
    private Date date;
    private StateEntity stateByIdStatus;
    private UserEntity userByIdUser;
    private UserEntity userByIdEmployee;

    @Id
    @Column(name = "sessionId", nullable = false)
    public int getSessionId() {
        return sessionId;
    }

    public void setSessionId(int sessionId) {
        this.sessionId = sessionId;
    }

    @Basic
    @Column(name = "idStatus", nullable = false)
    public int getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(int idStatus) {
        this.idStatus = idStatus;
    }

    @Basic
    @Column(name = "idUser", nullable = true)
    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    @Basic
    @Column(name = "idEmployee", nullable = true)
    public Integer getIdEmployee() {
        return idEmployee;
    }

    public void setIdEmployee(Integer idEmployee) {
        this.idEmployee = idEmployee;
    }

    @Basic
    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IssueEntity that = (IssueEntity) o;

        if (sessionId != that.sessionId) return false;
        if (idStatus != that.idStatus) return false;
        if (idUser != null ? !idUser.equals(that.idUser) : that.idUser != null) return false;
        if (idEmployee != null ? !idEmployee.equals(that.idEmployee) : that.idEmployee != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = sessionId;
        result = 31 * result + idStatus;
        result = 31 * result + (idUser != null ? idUser.hashCode() : 0);
        result = 31 * result + (idEmployee != null ? idEmployee.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "idStatus", referencedColumnName = "idStatus", nullable = false, insertable = false, updatable = false)
    public StateEntity getStateByIdStatus() {
        return stateByIdStatus;
    }

    public void setStateByIdStatus(StateEntity stateByIdStatus) {
        this.stateByIdStatus = stateByIdStatus;
    }

    @ManyToOne
    @JoinColumn(name = "idUser", referencedColumnName = "idUser", insertable = false, updatable = false)
    public UserEntity getUserByIdUser() {
        return userByIdUser;
    }

    public void setUserByIdUser(UserEntity userByIdUser) {
        this.userByIdUser = userByIdUser;
    }

    @ManyToOne
    @JoinColumn(name = "idEmployee", referencedColumnName = "idUser",  insertable = false, updatable = false)
    public UserEntity getUserByIdEmployee() {
        return userByIdEmployee;
    }

    public void setUserByIdEmployee(UserEntity userByIdEmployee) {
        this.userByIdEmployee = userByIdEmployee;
    }
}
