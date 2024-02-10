package example.plugins

import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureSecurity() {
    install(CORS) {
        allowHost("0.0.0.0:3000", schemes = listOf("http", "https"))
        allowHost("localhost:3000", schemes = listOf("http", "https"))
        anyHost()
    }
}
