package example.routes
import example.dao.CourseFacadeImpl
import example.dao.DatabaseSingleton.dbQuery
import example.models.Course
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
    post{
        dbQuery {
            val course = call.receive<Course>()
            println("recieved:")
            println(course)
            course.let { it2 ->
                call.respond(CourseFacadeImpl().addNewCourse(it2.name) ?: HttpStatusCode.InternalServerError)
            }
        }
    }
}