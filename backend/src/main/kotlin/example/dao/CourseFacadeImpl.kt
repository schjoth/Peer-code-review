package example.dao

import example.dao.DatabaseSingleton.dbQuery
import example.models.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class CourseFacadeImpl : CourseFacade {
    private fun resultRowToCourse(row: ResultRow) = Course(
        id = row[Courses.id],
        name = row[Courses.name],
    )

    override suspend fun allCourses(): List<Course> = dbQuery {
        Courses.selectAll().map(::resultRowToCourse)
    }

    override suspend fun course(id: Int): Course? = dbQuery {
        Courses
            .select { Courses.id eq id }
            .map(::resultRowToCourse)
            .singleOrNull()
    }

    override suspend fun addNewCourse(name: String): Course? {

        val insertStatement = Courses.insert {
            it[Courses.name] = name
        }
        return insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToCourse)
    }

    override suspend fun editCourse(id: Int, name: String): Boolean {
        return Courses.update({Courses.id eq id}){
            it[Courses.name] = name
        } > 0
    }

    override suspend fun deleteCourse(id: Int): Boolean {
        return Courses.deleteWhere { Courses.id eq id } > 0
    }
}