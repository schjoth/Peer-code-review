package example.dao

import example.models.User
import example.models.UserEntity


fun entityToUser(entity: UserEntity): User = User(
    id = entity.id.value,
    name = entity.name
)

class UserFacadeImpl : UserFacade {
    override suspend fun createNewUser(user: User) {
        UserEntity.new {
            name = user.name
        }
    }

    override suspend fun findUser(id: Int): User? {
        return UserEntity.findById(id)?.let {
            entityToUser(it)
        }
    }
}