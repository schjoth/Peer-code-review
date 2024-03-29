package example.services

import example.dao.CourseFacadeImpl
import example.dao.DatabaseSingleton.dbQuery
import example.dao.RepoFacadeImpl
import example.models.Repo
import example.models.repoFromEntity

class RepoService {
    private val repository = RepoFacadeImpl()
    private val courseRepo = CourseFacadeImpl()
    suspend fun repo(id: Int): Repo? {
        return dbQuery {
            repository.repo(id)?.let(::repoFromEntity)
        }
    }

    suspend fun createRepo(repoUrl: String): Repo? {
        val course = dbQuery {
            val org = repoUrl.split("/")[3]
            courseRepo.findByName(org)
        }
        return course?.let {
            dbQuery {
                repository.createRepo(repoUrl, course).let(::repoFromEntity)
            }
        }
    }
}
