package example.services

import example.dao.DatabaseSingleton.dbQuery
import example.dao.RepoFacadeImpl
import example.dao.ReviewerFacadeImpl
import example.models.Reviewer
import example.models.entityToReviewer
import java.util.*

class ReviewerService {
    private val repository = ReviewerFacadeImpl()
    private val repoRepository = RepoFacadeImpl()

    suspend fun newReviewer(identity: String, repoId: Int): Reviewer? {
        return dbQuery {
            repoRepository.repo(repoId)
        }?.let {
            return dbQuery {
                repository.insertReviewer(identity, it).let(::entityToReviewer)
            }
        }
    }

    suspend fun lookupIdentity(id: UUID): String? {
        return dbQuery {
            repository.lookupReviewer(id)?.identity
        }
    }

    suspend fun getReviewersByRepo(repoId: Int): Collection<Reviewer> {
        return dbQuery {
            repository.getReviewersByRepo(repoId).map(::entityToReviewer)
        }
    }
}
