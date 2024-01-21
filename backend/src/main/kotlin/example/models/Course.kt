package example.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Course(
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
    val user = reference("user_id", Users.id)
    val course = reference("course_id", Courses.id)
    val role = varchar("role", 64)

    override val primaryKey = PrimaryKey(user, course, role)
}