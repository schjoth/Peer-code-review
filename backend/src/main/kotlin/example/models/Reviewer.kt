package example.models

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import java.util.*

object UUIDSerializer : KSerializer<UUID> {
    override val descriptor = PrimitiveSerialDescriptor("UUID", PrimitiveKind.STRING)

    override fun deserialize(decoder: Decoder): UUID {
        return UUID.fromString(decoder.decodeString())
    }

    override fun serialize(encoder: Encoder, value: UUID) {
        encoder.encodeString(value.toString())
    }
}

@Serializable
data class Reviewer(
    @Serializable(with = UUIDSerializer::class)
    val id: UUID,
    val identity: String,
    val repo: Repo
)


object Reviewers : UUIDTable() {
    val identity = varchar("identity", 256)
    val repo = reference("fk_repos", Repos.id)
}

class ReviewerEntity(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<ReviewerEntity>(Reviewers)

    var identity by Reviewers.identity
    var repo by RepoEntity referencedOn Reviewers.repo
}

fun entityToReviewer(e: ReviewerEntity) = Reviewer(
    id = e.id.value,
    identity = e.identity,
    repo = repoFromEntity(e.repo)
)
