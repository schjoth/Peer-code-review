package example.routes

import example.models.Assignment
import example.services.AssignmentService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.assignmentRoutes() {
    get("{courseId}") {
        call.parameters["courseId"]?.let { it1 -> AssignmentService().getAllAssignments(it1.toInt()) }
    }
    post {
        val newAssignment = call.receive<Assignment>()
        newAssignment.let {
            call.respond(AssignmentService().createAssignment(it) ?: HttpStatusCode.InternalServerError)
        }

    }
}
