package models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class TagIssueEntityPK implements Serializable {
    private int tagId;
    private int sessionId;

    @Column(name = "tagID", nullable = false)
    @Id
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Column(name = "sessionId", nullable = false)
    @Id
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

        TagIssueEntityPK that = (TagIssueEntityPK) o;

        if (tagId != that.tagId) return false;
        if (sessionId != that.sessionId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = tagId;
        result = 31 * result + sessionId;
        return result;
    }
}
