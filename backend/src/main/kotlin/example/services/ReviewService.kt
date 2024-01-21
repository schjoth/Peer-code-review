package example.services

import example.dao.DatabaseSingleton.dbQuery
import example.dao.ReviewFacade
import example.dao.ReviewFacadeImpl
import example.models.Review

class ReviewService {
    private val repository: ReviewFacade = ReviewFacadeImpl()

    suspend fun getReviewsByAssignment(assignmentId: Int): List<Review> {
        return dbQuery {
            repository.getReviewsByAssignment(assignmentId)
        }
    }

    suspend fun createNewReview(review: Review): Review? {
        return dbQuery {
            repository.createNewReview(review)
        }
    }
}