package example.routes

import example.services.ReviewerService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.util.*

@Serializable
data class NewReviewerDTO(
    val identity: String,
    val repo: Int,
)

fun Route.reviewerRoutes() {
    post {
        val data = call.receive<NewReviewerDTO>()
        val res = ReviewerService().newReviewer(data.identity, data.repo)
        call.respond(res ?: HttpStatusCode.BadRequest)
    }

    get("{id}") {
        call.parameters["id"]?.let {
            val id = UUID.fromString(it)
            return@get call.respond(ReviewerService().lookupIdentity(id) ?: HttpStatusCode.NotFound)
        }
        call.respond(HttpStatusCode.BadRequest)
    }
}