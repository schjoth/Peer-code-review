package example.routes

import example.models.Comment
import example.models.Review
import example.models.User
import example.services.ReviewService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Route.reviewRoutes() {
    post {
        val data = call.receive<NewReview>()
        val review = Review(
            id = 0,
            feedback = data.feedback,
            comments = data.comments,
            author = User(1, "Test") //TODO replace when authenticaion is implemented
        )
        call.respond(ReviewService().createNewReview(review) ?: HttpStatusCode.InternalServerError)
    }

    get("{assignmentId}") {
        call.parameters["assignmentId"]?.let { it1 ->
            val reviews = ReviewService().getReviewsByAssignment(it1.toInt())
            call.respond(reviews)
        }
    }
}

@Serializable
data class NewReview(
    val feedback: String,
    val comments: List<Comment>
)
