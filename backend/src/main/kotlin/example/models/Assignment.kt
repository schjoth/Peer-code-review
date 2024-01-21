package example.models

import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

@Serializable
data class Assignment(
    val id: Int,
    val courseId: Int,
    val description: String,
    val startTime: LocalDateTime,
    val deadline: LocalDateTime,
    val reviewEnd: LocalDateTime,
    val timeZone: TimeZone
)

object Assignments : Table() {
    val id = integer("id").autoIncrement()
    val courseId = reference("course_id", Courses.id)
    val description = text("description")
    val startTime = datetime("startTime")
    val deadline = datetime("deadline")
    val reviewEnd = datetime("reviewEnd")
    val timeZone = varchar("timezone", 64)

    override val primaryKey = PrimaryKey(id)
}
