package models;

import javax.persistence.*;

@Entity
@Table(name = "Tag", schema = "zveermaz", catalog = "")
public class TagEntity {
    private int tagId;
    private String tagnaam;

    @Id
    @Column(name = "tagID", nullable = false)
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Basic
    @Column(name = "tagnaam", nullable = false, length = 255)
    public String getTagnaam() {
        return tagnaam;
    }

    public void setTagnaam(String tagnaam) {
        this.tagnaam = tagnaam;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TagEntity tagEntity = (TagEntity) o;

        if (tagId != tagEntity.tagId) return false;
        if (tagnaam != null ? !tagnaam.equals(tagEntity.tagnaam) : tagEntity.tagnaam != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = tagId;
        result = 31 * result + (tagnaam != null ? tagnaam.hashCode() : 0);
        return result;
    }
}
