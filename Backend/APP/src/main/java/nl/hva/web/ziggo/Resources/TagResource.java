package nl.hva.web.ziggo.Resources;

import models.ClientError;
import models.IssueEntity;
import models.TagEntity;
import models.TagIssueEntity;
import service.TagService;
import service.impl.TagServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.Response.Status.CONFLICT;

@Path("tags")
public class TagResource {
    private TagService tagService;

    /**
     * get instance of TagServiceImpl
     */
    public TagResource() {
        tagService = TagServiceImpl.getInstance();
    }

    /**
     * method to get all tags
     *
     * @return all tags
     */
    @GET
    @Path("/getalltags")
    @Produces(MediaType.APPLICATION_JSON)
    public List<TagEntity> getEmployeeScore() {
        return tagService.getAllTags();
    }

    /**
     * method to get issues by tagname
     *
     * @return all issues by tagname
     */
    @GET
    @Path("/getissuebyspecifictag/{tagnaam}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<IssueEntity> getIssueBySpecificTag(@PathParam("tagnaam") String tagnaam) {
        return tagService.getIssueBySpecificTag(tagnaam);
    }


    /**
     * method to get all tags linked to one issue
     *
     * @return all tags by issueID
     */
    @GET
    @Path("/gettagsforissue/{sessionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTagsForIssue(@PathParam("sessionId") int sessionId) {
        Object tagIssueEntity = tagService.getAllTagsForClientByIssueId(sessionId);

        if (tagIssueEntity == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("resource not found for id " + sessionId)).build();
        } else {
            return Response.status(Response.Status.OK).entity(tagIssueEntity).build();
        }
    }

    /**
     * method to put tags to the database
     *
     * @param tag1 received from post call
     * @param tag2 received from post call
     * @param tag3 received from post call
     * @return tagIssueEntity to database
     */
    @POST
    @Path("/newtags")
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response setNewTags(@FormParam("sessionId") int sessionId,
                               @FormParam("tag1") int tag1,
                               @FormParam("tag2") int tag2,
                               @FormParam("tag3") int tag3) {
        try {
            TagIssueEntity tagIssueEntity = tagService.setTagsForIssue(sessionId, tag1, tag2, tag3);

            return Response.status(Response.Status.OK).entity(tagIssueEntity).build();

        } catch (Exception e) {
            return Response.status(CONFLICT).build();
        }


    }

}
