package example.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Course(
    val id: Int,
    val name: String,
    val installationId: Int,

    val students: List<User> = listOf(),
    val admins: List<User> = listOf()
)

object Courses : IntIdTable() {
    val name = varchar("title", 128)
    val installationId = integer("installation_id")
}

object UsersInCourse : Table() {
    val user = reference("user_id", Users.id)
    val course = reference("course_id", Courses.id)
    val role = varchar("role", 64)

    override val primaryKey = PrimaryKey(user, course, role)
}

class CourseEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CourseEntity>(Courses)

    var name by Courses.name
    var installationId by Courses.installationId
}