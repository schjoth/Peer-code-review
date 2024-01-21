package example.dao

import example.models.Review

interface ReviewFacade {
    suspend fun createNewReview(review: Review): Review?
    suspend fun getReviewsByAssignment(assignmentId: Int): List<Review>
}