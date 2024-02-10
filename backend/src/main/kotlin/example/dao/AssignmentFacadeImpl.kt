package example.dao

import example.models.Assignment
import example.models.Assignments
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select

class AssignmentFacadeImpl : AssignmentFacade {

    //TODO remove entire file
    private fun resultRowToAssignment(row: ResultRow) = Assignment(
        id = row[Assignments.id],
        courseId = 0,
        description = row[Assignments.description],
        startTime = row[Assignments.startTime].toKotlinLocalDateTime(),
        deadline = row[Assignments.deadline].toKotlinLocalDateTime(),
        reviewEnd = row[Assignments.reviewEnd].toKotlinLocalDateTime(),
        timeZone = TimeZone.of(row[Assignments.timeZone])
    )

    override suspend fun createNewAssignment(assignment: Assignment): Assignment? {
        val newAssignment = Assignments.insert {
            it[Assignments.description] = assignment.description
            it[Assignments.courseId] = assignment.courseId
            it[Assignments.startTime] = assignment.startTime.toJavaLocalDateTime()
            it[Assignments.deadline] = assignment.deadline.toJavaLocalDateTime()
            it[Assignments.reviewEnd] = assignment.reviewEnd.toJavaLocalDateTime()
            it[Assignments.timeZone] = assignment.timeZone.toString()
        }
        return newAssignment.resultedValues?.singleOrNull()?.let(::resultRowToAssignment)
    }

    override suspend fun getAssignmentById(id: Int): Assignment? {
        return Assignments.select { Assignments.id eq id }.map(::resultRowToAssignment).singleOrNull()
    }

    override suspend fun getByCourseId(courseId: Int): List<Assignment> {
        return Assignments.select { Assignments.courseId eq courseId }.map(::resultRowToAssignment)
    }
}