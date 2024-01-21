package example.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Submission(
    val id: Int,
    val assignmentId: Int,
    val userId: Int,
    //TODO add the submission itself
)

object Submissions : Table() {
    val id = integer("id").autoIncrement()
    val assignmentId = reference("assignment_id", Assignments.id)
    val userId = reference("user_id", Users.id)

    override val primaryKey = PrimaryKey(id)
}