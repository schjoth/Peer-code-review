package example.dao

import example.dao.CourseFacadeImpl.Utils.courseFromEntity
import example.models.CourseEntity
import example.models.Repo
import example.models.RepoEntity


class RepoFacadeImpl {
    private fun repoFromEntity(row: RepoEntity) = Repo(
        id = row.id.value,
        repoUrl = row.repoUrl,
        course = courseFromEntity(row.course)
    )

    suspend fun createRepo(url: String, course: CourseEntity): Repo {
        return RepoEntity.new {
            repoUrl = url
            this.course = course
        }.let(::repoFromEntity)
    }

    suspend fun repo(id: Int): Repo? {
        return RepoEntity.findById(id)?.let(::repoFromEntity)
    }
}