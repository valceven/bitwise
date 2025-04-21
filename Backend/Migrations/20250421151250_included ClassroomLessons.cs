using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class includedClassroomLessons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassroomLesson_Classrooms_ClassroomId",
                table: "ClassroomLesson");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassroomLesson_Lessons_LessonId",
                table: "ClassroomLesson");

            migrationBuilder.DropForeignKey(
                name: "FK_Classrooms_Students_StudentId",
                table: "Classrooms");

            migrationBuilder.DropIndex(
                name: "IX_Classrooms_StudentId",
                table: "Classrooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassroomLesson",
                table: "ClassroomLesson");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Classrooms");

            migrationBuilder.RenameTable(
                name: "ClassroomLesson",
                newName: "ClassroomLessons");

            migrationBuilder.RenameIndex(
                name: "IX_ClassroomLesson_LessonId",
                table: "ClassroomLessons",
                newName: "IX_ClassroomLessons_LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_ClassroomLesson_ClassroomId",
                table: "ClassroomLessons",
                newName: "IX_ClassroomLessons_ClassroomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassroomLessons",
                table: "ClassroomLessons",
                column: "ClassroomLessonId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentClassrooms_StudentId",
                table: "StudentClassrooms",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassroomLessons_Classrooms_ClassroomId",
                table: "ClassroomLessons",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassroomLessons_Lessons_LessonId",
                table: "ClassroomLessons",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentClassrooms_Students_StudentId",
                table: "StudentClassrooms",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassroomLessons_Classrooms_ClassroomId",
                table: "ClassroomLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassroomLessons_Lessons_LessonId",
                table: "ClassroomLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentClassrooms_Students_StudentId",
                table: "StudentClassrooms");

            migrationBuilder.DropIndex(
                name: "IX_StudentClassrooms_StudentId",
                table: "StudentClassrooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassroomLessons",
                table: "ClassroomLessons");

            migrationBuilder.RenameTable(
                name: "ClassroomLessons",
                newName: "ClassroomLesson");

            migrationBuilder.RenameIndex(
                name: "IX_ClassroomLessons_LessonId",
                table: "ClassroomLesson",
                newName: "IX_ClassroomLesson_LessonId");

            migrationBuilder.RenameIndex(
                name: "IX_ClassroomLessons_ClassroomId",
                table: "ClassroomLesson",
                newName: "IX_ClassroomLesson_ClassroomId");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Classrooms",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassroomLesson",
                table: "ClassroomLesson",
                column: "ClassroomLessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Classrooms_StudentId",
                table: "Classrooms",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassroomLesson_Classrooms_ClassroomId",
                table: "ClassroomLesson",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassroomLesson_Lessons_LessonId",
                table: "ClassroomLesson",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Classrooms_Students_StudentId",
                table: "Classrooms",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId");
        }
    }
}
