package example.models

import org.jetbrains.exposed.sql.*
import kotlinx.serialization.Serializable

@Serializable
data class Course (
    @Serializable
    val id: Int,
    val name: String,
    val students: List<User> = listOf(),
    val admins: List<User> = listOf()
)

object Courses : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("title", 128)

    override val primaryKey = PrimaryKey(id)
}

object UsersInCourse : Table() {
    val user = integer("userId")
    val course = integer("courseId")
    val role = varchar("role", 64)

    //TODO figure out the foreign key stuff

    override val primaryKey = PrimaryKey(user, course, role)
}