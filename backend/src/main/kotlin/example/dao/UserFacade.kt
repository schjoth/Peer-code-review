package example.dao

import example.models.User

interface UserFacade {
    suspend fun createNewUser(user: User)
    suspend fun findUser(id: Int): User?

}