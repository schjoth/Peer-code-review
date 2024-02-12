package example.dao

import example.models.RepoEntity
import example.models.ReviewerEntity
import example.models.Reviewers
import java.util.*

class ReviewerFacadeImpl {

    suspend fun getReviewersByRepo(id: Int): Collection<ReviewerEntity> {
        return ReviewerEntity.find { Reviewers.repo eq id }.toList()
    }

    suspend fun lookupReviewer(id: UUID): ReviewerEntity? {
        return ReviewerEntity.findById(id)
    }

    suspend fun insertReviewer(identity: String, repo: RepoEntity): ReviewerEntity {
        return ReviewerEntity.new {
            this.identity = identity
            this.repo = repo
        }
    }
}
