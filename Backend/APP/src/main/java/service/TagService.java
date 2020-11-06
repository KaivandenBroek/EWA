package service;

import models.IssueEntity;
import models.TagEntity;
import models.TagIssueEntity;

import java.util.List;

public interface TagService {
    /**
     * Get list of all tags
     *
     * @return list of all tags
     */
    List<TagEntity> tag();

    /**
     * Get all tags
     *
     * @return all tags
     */
    List<TagEntity> getAllTags();

    /**
     * Get issue by specific tag
     *
     * @param tagID id of the tag
     * @return issue by specific tag
     */
    List<IssueEntity> getIssueBySpecificTag(String tagID);// Returnt een list

    /**
     * Set tags for issue
     *
     * @param sessionId id of the issue
     * @param tag1      first tag that is set
     * @param tag2      second tag that is set
     * @param tag3      third tag that is set
     * @return set tag for issue
     */
    TagIssueEntity setTagsForIssue(int sessionId, int tag1, int tag2, int tag3);

    /**
     * Get all tags for client by issue id
     *
     * @param sessionId id of the issue
     * @return all tags of client by issue
     */
    Object getAllTagsForClientByIssueId(int sessionId);
}
