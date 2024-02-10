package example.services

import example.dao.CourseFacadeImpl
import example.dao.DatabaseSingleton.dbQuery

class CourseService {
    private val repository = CourseFacadeImpl()

    suspend fun newCourse(name: String, installationId: Int) {
        println(installationId)
        dbQuery {
            repository.addNewCourse(name, installationId)
        }
    }

    suspend fun getInstallationId(id: Int): Int? {
        val course = dbQuery {
            repository.course(id)
        }
        return course?.installationId
    }
}