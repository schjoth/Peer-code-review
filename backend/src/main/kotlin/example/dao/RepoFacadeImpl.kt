package example.dao

import example.models.CourseEntity
import example.models.RepoEntity


class RepoFacadeImpl {

    suspend fun createRepo(url: String, course: CourseEntity): RepoEntity {
        return RepoEntity.new {
            repoUrl = url
            this.course = course
        }
    }

    suspend fun repo(id: Int): RepoEntity? {
        return RepoEntity.findById(id)
    }
}