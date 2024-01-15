package example.dao


import example.models.*

interface CourseFacade {
    suspend fun allCourses(): List<Course>
    suspend fun course(id: Int): Course?
    suspend fun addNewCourse(name: String): Course?
    suspend fun editCourse(id: Int, name: String): Boolean
    suspend fun deleteCourse(id: Int): Boolean
}