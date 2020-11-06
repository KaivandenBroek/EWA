package models;

import javax.persistence.*;

@Entity
@Table(name = "Modem", schema = "zveermaz", catalog = "")
public class ModemEntity {
    private int idModem;
    private String modemNaam;

    @Id
    @Column(name = "idModem", nullable = false)
    public int getIdModem() {
        return idModem;
    }

    public void setIdModem(int idModem) {
        this.idModem = idModem;
    }

    @Basic
    @Column(name = "modemNaam", nullable = false, length = 45)
    public String getModemNaam() {
        return modemNaam;
    }

    public void setModemNaam(String modemNaam) {
        this.modemNaam = modemNaam;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ModemEntity that = (ModemEntity) o;

        if (idModem != that.idModem) return false;
        if (modemNaam != null ? !modemNaam.equals(that.modemNaam) : that.modemNaam != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idModem;
        result = 31 * result + (modemNaam != null ? modemNaam.hashCode() : 0);
        return result;
    }
}
