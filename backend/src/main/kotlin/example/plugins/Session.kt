package example.plugins

import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureAuthentication() {
    install(Authentication) {
        bearer("auth-bearer") {
            realm = "Access to the '/' path"
            authenticate { tokenCredential ->
                println("__________________________________ $tokenCredential")
                if (tokenCredential.token == "abc123") {
                    UserIdPrincipal("jetbrains")
                } else {
                    null
                }
            }
        }
    }

//    install(Authentication) {
//        oauth("auth-oauth-google") {
//            // Configure oauth authentication
//            urlProvider = { "http://localhost:8090/callback" }
//            providerLookup = {
//                OAuthServerSettings.OAuth2ServerSettings(
//                    name = "google",
//                    authorizeUrl = "https://accounts.google.com/o/oauth2/auth",
//                    accessTokenUrl = "https://accounts.google.com/o/oauth2/token",
//                    requestMethod = HttpMethod.Post,
//                    clientId = System.getenv("GOOGLE_CLIENT_ID"),
//                    clientSecret = System.getenv("GOOGLE_CLIENT_SECRET"),
//                    defaultScopes = listOf("https://www.googleapis.com/auth/userinfo.profile"),
//                    extraAuthParameters = listOf("access_type" to "offline"),
//                    onStateCreated = { call, state ->
//                        //saves new state with redirect url value
//                        call.request.queryParameters["redirectUrl"]?.let {
//                            redirects[state] = it
//                        }
//                    }
//                )
//            }
//            client = httpClient
//        }
//    }
    routing {
        authenticate("auth-bearer") {
            get("/test") {
                call.respondText("Hello, ${call.principal<UserIdPrincipal>()?.name}!")
            }
        }
//        authenticate("auth-oauth-google") {
//            get("/login") {
//                // Redirects to 'authorizeUrl' automatically
//            }
//            get("/callback") {
//                val currentPrincipal: OAuthAccessTokenResponse.OAuth2? = call.principal()
//                // redirects home if the url is not found before authorization
//                currentPrincipal?.let { principal ->
//                    principal.state?.let { state ->
//                        call.sessions.set(UserSession(state, principal.accessToken))
//                        redirects[state]?.let { redirect ->
//                            call.respondRedirect(redirect)
//                            return@get
//                        }
//                    }
//                }
//                call.respondRedirect("/home")
//            }
//        }
    }
}

data class UserSession(val state: String, val token: String)