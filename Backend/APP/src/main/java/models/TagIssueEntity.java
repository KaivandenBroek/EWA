package models;

import javax.persistence.*;

@Entity
@Table(name = "TagIssue", schema = "zveermaz", catalog = "")
@IdClass(TagIssueEntityPK.class)
public class TagIssueEntity {
    private int tagId;
    private int sessionId;
    private TagEntity tagByTagId;
    private IssueEntity issueBySessionId;

    @Id
    @Column(name = "tagID", nullable = false)
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Id
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

        TagIssueEntity that = (TagIssueEntity) o;

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

    @ManyToOne
    @JoinColumn(name = "tagID", referencedColumnName = "tagID", nullable = false, insertable = false, updatable = false)
    public TagEntity getTagByTagId() {
        return tagByTagId;
    }

    public void setTagByTagId(TagEntity tagByTagId) {
        this.tagByTagId = tagByTagId;
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
