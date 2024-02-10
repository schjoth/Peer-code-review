package example.routes

import example.dao.CourseFacadeImpl
import example.dao.DatabaseSingleton.dbQuery
import example.models.Course
import example.services.CourseService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.courseRoutes() {
    get("{id}") {
        dbQuery {
            call.parameters["id"]?.let { it1 ->
                val course = CourseFacadeImpl().course(it1.toInt())
                call.respond(course ?: HttpStatusCode.NotFound)
            }
        }
    }

    get("{id}/installation") {
        call.parameters["id"]?.let { it1 ->
            call.respond(CourseService().getInstallationId(it1.toInt()) ?: HttpStatusCode.NotFound)
        }
    }

    post {
        val course = call.receive<Course>()
        course.let { it2 ->
            call.respond(
                CourseService().newCourse(it2.name, it2.installationId) ?: HttpStatusCode.InternalServerError
            )
        }
    }
}