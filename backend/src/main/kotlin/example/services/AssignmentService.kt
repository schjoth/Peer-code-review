package example.services

import example.dao.AssignmentFacade
import example.dao.AssignmentFacadeImpl
import example.dao.DatabaseSingleton.dbQuery
import example.models.Assignment

class AssignmentService {
    private val repository: AssignmentFacade = AssignmentFacadeImpl()

    suspend fun getAllAssignments(courseId: Int): List<Assignment> {
        return dbQuery {
            repository.getByCourseId(courseId)
        }
    }

    suspend fun createAssignment(assignment: Assignment): Assignment? {
        return dbQuery {
            repository.createNewAssignment(assignment)
        }
    }

    suspend fun getById(id: Int) {
        return dbQuery {
            repository.getAssignmentById(id)
        }
    }

}