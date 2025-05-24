using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedStudentRelatedTablesAddedStudentClassroomId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Students_StudentId",
                table: "StudentAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentTopics_Students_StudentId",
                table: "StudentTopics");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "StudentTopics",
                newName: "StudentClassroomId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentTopics_StudentId",
                table: "StudentTopics",
                newName: "IX_StudentTopics_StudentClassroomId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "StudentLessons",
                newName: "StudentClassroomId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "StudentAssessments",
                newName: "StudentClassroomId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentAssessments_StudentId",
                table: "StudentAssessments",
                newName: "IX_StudentAssessments_StudentClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentTopics_TopicId",
                table: "StudentTopics",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentLessons_LessonId",
                table: "StudentLessons",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentLessons_StudentClassroomId",
                table: "StudentLessons",
                column: "StudentClassroomId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_StudentClassrooms_StudentClassroomId",
                table: "StudentAssessments",
                column: "StudentClassroomId",
                principalTable: "StudentClassrooms",
                principalColumn: "StudentClassroomId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLessons_Lessons_LessonId",
                table: "StudentLessons",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLessons_StudentClassrooms_StudentClassroomId",
                table: "StudentLessons",
                column: "StudentClassroomId",
                principalTable: "StudentClassrooms",
                principalColumn: "StudentClassroomId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentTopics_StudentClassrooms_StudentClassroomId",
                table: "StudentTopics",
                column: "StudentClassroomId",
                principalTable: "StudentClassrooms",
                principalColumn: "StudentClassroomId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentTopics_Topics_TopicId",
                table: "StudentTopics",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_StudentClassrooms_StudentClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentLessons_Lessons_LessonId",
                table: "StudentLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentLessons_StudentClassrooms_StudentClassroomId",
                table: "StudentLessons");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentTopics_StudentClassrooms_StudentClassroomId",
                table: "StudentTopics");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentTopics_Topics_TopicId",
                table: "StudentTopics");

            migrationBuilder.DropIndex(
                name: "IX_StudentTopics_TopicId",
                table: "StudentTopics");

            migrationBuilder.DropIndex(
                name: "IX_StudentLessons_LessonId",
                table: "StudentLessons");

            migrationBuilder.DropIndex(
                name: "IX_StudentLessons_StudentClassroomId",
                table: "StudentLessons");

            migrationBuilder.RenameColumn(
                name: "StudentClassroomId",
                table: "StudentTopics",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentTopics_StudentClassroomId",
                table: "StudentTopics",
                newName: "IX_StudentTopics_StudentId");

            migrationBuilder.RenameColumn(
                name: "StudentClassroomId",
                table: "StudentLessons",
                newName: "StudentId");

            migrationBuilder.RenameColumn(
                name: "StudentClassroomId",
                table: "StudentAssessments",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentAssessments_StudentClassroomId",
                table: "StudentAssessments",
                newName: "IX_StudentAssessments_StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Students_StudentId",
                table: "StudentAssessments",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentTopics_Students_StudentId",
                table: "StudentTopics",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
