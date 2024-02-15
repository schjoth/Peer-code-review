package example.routes

import example.services.RepoService
import example.services.ReviewerService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

@Serializable
data class RepoDTO(
    val repoUrl: String
)

@Serializable
data class RepoId(
    val repoId: Int
)

fun Route.repoRoutes() {
    post {
        val data = call.receive<RepoDTO>()
        RepoService().createRepo(data.repoUrl)?.id?.let {
            return@post call.respond(RepoId(it))
        }
        call.respond(HttpStatusCode.BadRequest)
    }

    route("{repoId}") {
        get() {
            call.parameters["repoId"]?.let {
                call.respond(RepoService().repo(it.toInt()) ?: HttpStatusCode.NotFound)
            }
        }
        get("/reviewers") {
            call.parameters["repoId"]?.let {
                call.respond(ReviewerService().getReviewersByRepo(it.toInt()))
            }
        }
    }

}