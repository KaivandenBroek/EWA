package service.impl;

import models.IssueEntity;
import models.TagEntity;
import models.TagIssueEntity;
import org.json.simple.JSONObject;
import service.TagService;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class TagServiceImpl implements TagService {
    private static TagServiceImpl tagService;

    // new static TagServiceImpl
    static {
        tagService = new TagServiceImpl();
    }

    // new JSON object
    JSONObject jsonObject = new JSONObject();
    // create private variables
    private EntityManagerFactory entityManagerFactory;

    // get Persistence
    private TagServiceImpl() {
        entityManagerFactory = Persistence.createEntityManagerFactory("Ziggo-EWA");
    }

    // get Instance of TagService
    public static TagService getInstance() {
        return tagService;
    }

    // get EntityManager
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    /**
     * Get list of all tags
     *
     * @return all tags
     */
    @Override
    public List<TagEntity> tag() {
        return null;
    }

    /**
     * Get all tags
     *
     * @return all tags
     */
    @SuppressWarnings("unchecked")
    @Override
    public List<TagEntity> getAllTags() {
        EntityManager em = getEntityManager();

        List<TagEntity> tags = null;
        try {
            tags = em.createQuery("SELECT t.tagnaam FROM TagEntity t").getResultList();
        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }
        return tags;
    }

    /**
     * Get issue by specific tag
     *
     * @param tagnaam name of the tag
     * @return issue by specific tag
     */
    @Override
    public List<IssueEntity> getIssueBySpecificTag(String tagnaam) {

        // Initializer
        List<IssueEntity> issues = null;

        // get EntityManager
        EntityManager em = getEntityManager();

        try {
            // get tag name with tagid
            int tagId = em.createQuery("SELECT u.tagId FROM TagEntity u WHERE u.tagnaam= :tagnaam", Integer.class)
                    .setParameter("tagnaam", tagnaam).getSingleResult();

            List<Integer> tagIssueSessionIds = em.createQuery("SELECT u.sessionId FROM TagIssueEntity u WHERE u.tagId= :tagid", Integer.class)
                    .setParameter("tagid", tagId).getResultList();

            if (tagIssueSessionIds.size() != 0) {
                issues = em.createQuery("SELECT u FROM IssueEntity u WHERE u.sessionId IN :tagIssueSessionIds", IssueEntity.class)
                        .setParameter("tagIssueSessionIds", tagIssueSessionIds).getResultList();
            }

        } catch (IllegalArgumentException e) {
            //if no result is found throw exception
            e.getMessage();
        } finally {
            //close entity manager
            em.close();
        }
        return issues;
    }

    /**
     * Get all tags for client by issue id
     *
     * @param sessionId id of the issue
     * @return all tags for client by issue id
     */
    @SuppressWarnings("unchecked")
    @Override
    public Object getAllTagsForClientByIssueId(int sessionId) {
        EntityManager em = getEntityManager();

        List<Object> list = new ArrayList<>();

        try {
            List<String> tags = em.createQuery("SELECT u.tagByTagId.tagnaam FROM TagIssueEntity u WHERE u.sessionId = :sessionId")
                    .setParameter("sessionId", sessionId).getResultList();

            if (tags.size() <= 0) {
                return null;
            }
            for (String tagName : tags) {
//                JSONObject jsonObject = new JSONObject();
                list.add(jsonObject.put("tagForIssue", tagName));
            }

        } catch (IllegalArgumentException | NoResultException e) {
            e.getMessage();
        } finally {
            em.close();
        }
        return list;
    }

    /**
     * Set the tags for issue
     *
     * @param sessionId id of the issue
     * @param tag1      first tag that is set
     * @param tag2      second tag that is set
     * @param tag3      third tag that is set
     * @return tags for issue
     */
    @Override
    public TagIssueEntity setTagsForIssue(int sessionId, int tag1, int tag2, int tag3) {
        TagIssueEntity tagIssueEntity = new TagIssueEntity();

        if (IssueServiceImpl.getInstance().getIssueById(sessionId) == null) {
            return null;
        }
        tagIssueEntity.setSessionId(sessionId);
        tagIssueEntity.setTagId(tag1);
        if (!sendToDatabase(tagIssueEntity)) {
            return null;
        }
        tagIssueEntity.setSessionId(sessionId);
        tagIssueEntity.setTagId(tag2);
        if (!sendToDatabase(tagIssueEntity)) {
            return null;
        }

        tagIssueEntity.setSessionId(sessionId);
        tagIssueEntity.setTagId(tag3);
        if (!sendToDatabase(tagIssueEntity)) {
            return null;
        }
        return tagIssueEntity;
    }

    /**
     * Send tags to database
     *
     * @param tagIssueEntity tag issue of entity
     * @return tags to database
     */
    private boolean sendToDatabase(TagIssueEntity tagIssueEntity) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();

            em.persist(tagIssueEntity);

            em.getTransaction().commit();
        } catch (RollbackException e) {
            e.getMessage();
            return false;
        } finally {
            em.close();
        }
        return true;
    }


}
