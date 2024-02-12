package example.dao

import example.models.*

class ReviewFacadeImpl : ReviewFacade {

//    private fun resultRowToReview(row: ResultRow) = Review(
//        id = row[Reviews.id],
//        feedback = row[Reviews.id],
//        id = row[Reviews.kkkkVid],
//        id = row[Reviews.id],
//    )

    companion object Utils {
        fun entityToReview(entity: ReviewEntity) = Review(
            id = entity.id.value,
            //        author = User(1, "test"),
            author = entityToUser(entity.author),
            comments = entity.comments.comments,
            feedback = entity.feedback
        )
    }

    override suspend fun createNewReview(review: Review): Review? {

        //TODO REMOVE:
        println("user id = " + UserEntity.new { name = review.author.name }.id.value)

        val user = UserEntity.findById(review.author.id)
        println(user)
        return user?.let {
            val newReview = ReviewEntity.new {
                feedback = review.feedback
                author = it
                //TODO author and assignment
                comments = Comments(review.comments)
            }
            println("HEIHEIHEI: $newReview")
            entityToReview(newReview)
        }
    }

    override suspend fun getReviewsByAssignment(assignmentId: Int): List<Review> {

        println(ReviewEntity.find { Reviews.author eq assignmentId }.map(::entityToReview))
        return ReviewEntity.find { Reviews.author eq assignmentId }.map(::entityToReview)
    }
}