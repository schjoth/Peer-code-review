package example.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

@Serializable
data class Repo(
    val repoUrl: String,
    val id: Int,
    val course: Course
)

object Repos : IntIdTable() {
    val repoUrl = varchar("repo_url", 512)
    val course = reference("fk_courses", Courses.id)
}

class RepoEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<RepoEntity>(Repos)

    var repoUrl by Repos.repoUrl
    var course by CourseEntity referencedOn Repos.course
}