package example.models

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.json.json

@Serializable
data class Review(
    val id: Int,
    val feedback: String,
    val author: User,
    val comments: List<Comment>
)

@Serializable
data class Comment(
    val lineNumber: Int,
    val text: String
)

@Serializable
data class Comments(
    val comments: List<Comment>
)

val format = Json { prettyPrint = true }

object Reviews : IntIdTable() {
    val feedback = text("feedback")
    val author = reference("author_id", Users.id)

    //    val submission = integer("submission_id") references Submissions.id
    val comments = json<Comments>("comments", format)
}

class ReviewEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<ReviewEntity>(Reviews)

    var feedback by Reviews.feedback
    var author by UserEntity referencedOn Reviews.author
    var comments by Reviews.comments
}

