package example

import example.dao.DatabaseSingleton
import example.plugins.configureAuthentication
import example.plugins.configureSecurity
import example.plugins.configureSerialization
import example.routes.configureRouting
import io.ktor.server.application.*
import io.ktor.server.netty.*

/*
fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
            .start(wait = true)

}

 */


fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    configureAuthentication()
    configureSecurity()
    configureSerialization()
    configureRouting()
    DatabaseSingleton.init(environment.config)
}
