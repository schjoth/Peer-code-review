package example.services

import example.dao.AssignmentFacadeImpl
import example.models.Submission
import kotlinx.datetime.Clock
import kotlinx.datetime.toInstant

class SubmissionService {
    suspend fun deliverSubmission(submission: Submission): Boolean {
        val now = Clock.System.now()
        val assignment = AssignmentFacadeImpl().getAssignmentById(submission.assignmentId)
        val deadline = assignment?.deadline?.toInstant(assignment.timeZone)


        return if (deadline == null || now > deadline) {
            false;
        } else {
            //TODO: deliver
            true
        }
    }
}