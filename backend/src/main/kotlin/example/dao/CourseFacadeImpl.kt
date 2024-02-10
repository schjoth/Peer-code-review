package example.dao

import example.dao.DatabaseSingleton.dbQuery
import example.models.Course
import example.models.CourseEntity
import example.models.Courses
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class CourseFacadeImpl : CourseFacade {

    companion object Utils {
        fun courseFromEntity(row: CourseEntity) = Course(
            id = row.id.value,
            name = row.name,
            installationId = row.installationId
        )
    }

    override suspend fun allCourses(): List<Course> = dbQuery {
        CourseEntity.all().map(::courseFromEntity)
    }

    override suspend fun course(id: Int): Course? = dbQuery {
        CourseEntity.findById(id)?.let {
            courseFromEntity(it)
        }
    }

    override suspend fun addNewCourse(name: String, installationId: Int): Course? {
        return CourseEntity.new {
            this.name = name
            this.installationId = installationId
        }.let {
            courseFromEntity(it)
        }
//        val insertStatement = Courses.insert {
//            it[Courses.name] = name
//            it[Courses.installationId] = installationId
//        }
//        return insertStatement.resultedValues?.singleOrNull()?.let(::cour)
    }

    override suspend fun editCourse(id: Int, name: String): Boolean {
        return Courses.update({ Courses.id eq id }) {
            it[Courses.name] = name
        } > 0
    }

    override suspend fun deleteCourse(id: Int): Boolean {
        return Courses.deleteWhere { Courses.id eq id } > 0
    }

    override suspend fun findByName(name: String): CourseEntity? {
        return CourseEntity.find { Courses.name eq name }.singleOrNull()
    }
}