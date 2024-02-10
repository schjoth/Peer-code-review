package example.dao


import example.models.Course
import example.models.CourseEntity

interface CourseFacade {
    suspend fun allCourses(): List<Course>
    suspend fun course(id: Int): Course?
    suspend fun addNewCourse(name: String, installationId: Int): Course?
    suspend fun editCourse(id: Int, name: String): Boolean
    suspend fun deleteCourse(id: Int): Boolean

    suspend fun findByName(name: String): CourseEntity?
}