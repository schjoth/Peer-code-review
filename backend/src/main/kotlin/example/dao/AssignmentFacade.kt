package example.dao

import example.models.Assignment

interface AssignmentFacade {
    suspend fun createNewAssignment(assignment: Assignment): Assignment?

    suspend fun getAssignmentById(id: Int): Assignment?
    suspend fun getByCourseId(courseId: Int): List<Assignment>
}