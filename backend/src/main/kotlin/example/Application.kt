package example

import example.dao.DatabaseSingleton
import example.plugins.*
import example.routes.configureRouting
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

/*
fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
            .start(wait = true)

}

 */

fun main(args: Array<String>): Unit = EngineMain.main(args)


fun Application.module() {
    configureSecurity()
    configureSerialization()
    configureDatabases()
    configureRouting()
    DatabaseSingleton.init(environment.config)
}
