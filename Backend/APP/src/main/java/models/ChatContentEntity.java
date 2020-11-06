package models;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "chatContent", schema = "zveermaz", catalog = "")
public class ChatContentEntity {
    private long idchatContent;
    private String linetext;
    private Timestamp createdat;
    private int sessionId;
    private IssueEntity issueBySessionId;

    @Id
    @Column(name = "idchatContent", nullable = false)
    public long getIdchatContent() {
        return idchatContent;
    }

    public void setIdchatContent(long idchatContent) {
        this.idchatContent = idchatContent;
    }

    @Basic
    @Column(name = "linetext", nullable = true, length = -1)
    public String getLinetext() {
        return linetext;
    }

    public void setLinetext(String linetext) {
        this.linetext = linetext;
    }

    @Basic
    @Column(name = "createdat", nullable = true)
    public Timestamp getCreatedat() {
        return createdat;
    }

    public void setCreatedat(Timestamp createdat) {
        this.createdat = createdat;
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

        ChatContentEntity that = (ChatContentEntity) o;

        if (idchatContent != that.idchatContent) return false;
        if (sessionId != that.sessionId) return false;
        if (linetext != null ? !linetext.equals(that.linetext) : that.linetext != null) return false;
        if (createdat != null ? !createdat.equals(that.createdat) : that.createdat != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (idchatContent ^ (idchatContent >>> 32));
        result = 31 * result + (linetext != null ? linetext.hashCode() : 0);
        result = 31 * result + (createdat != null ? createdat.hashCode() : 0);
        result = 31 * result + sessionId;
        return result;
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
