package example.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        route("/course") {
            courseRoutes()
        }
        route("/repo") {
            repoRoutes()
        }
        route("/reviewer") {
            reviewerRoutes()
        }
    }
}
