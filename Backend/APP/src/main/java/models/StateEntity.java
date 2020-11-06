package models;

import javax.persistence.*;

@Entity
@Table(name = "State", schema = "zveermaz", catalog = "")
public class StateEntity {
    private int idStatus;
    private String statusNaam;

    @Id
    @Column(name = "idStatus", nullable = false)
    public int getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(int idStatus) {
        this.idStatus = idStatus;
    }

    @Basic
    @Column(name = "statusNaam", nullable = false, length = 45)
    public String getStatusNaam() {
        return statusNaam;
    }

    public void setStatusNaam(String statusNaam) {
        this.statusNaam = statusNaam;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StateEntity that = (StateEntity) o;

        if (idStatus != that.idStatus) return false;
        if (statusNaam != null ? !statusNaam.equals(that.statusNaam) : that.statusNaam != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idStatus;
        result = 31 * result + (statusNaam != null ? statusNaam.hashCode() : 0);
        return result;
    }
}
