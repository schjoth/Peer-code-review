package example.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*

@Serializable
data class User(
    val userId: Int,
    val name: String
)

object Users : Table() {
    val userId = integer("id")
    val name = varchar("name", 128)

    override val primaryKey = PrimaryKey(Courses.id)
}
