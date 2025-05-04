using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedTopicNavToStudentAssessment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TopicId",
                table: "StudentAssessments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TopicAssessments_AssessmentId",
                table: "TopicAssessments",
                column: "AssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TopicAssessments_TopicId",
                table: "TopicAssessments",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessments_TopicId",
                table: "StudentAssessments",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Topics_TopicId",
                table: "StudentAssessments",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicAssessments_Assessments_AssessmentId",
                table: "TopicAssessments",
                column: "AssessmentId",
                principalTable: "Assessments",
                principalColumn: "AssessmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TopicAssessments_Topics_TopicId",
                table: "TopicAssessments",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Topics_TopicId",
                table: "StudentAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicAssessments_Assessments_AssessmentId",
                table: "TopicAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicAssessments_Topics_TopicId",
                table: "TopicAssessments");

            migrationBuilder.DropIndex(
                name: "IX_TopicAssessments_AssessmentId",
                table: "TopicAssessments");

            migrationBuilder.DropIndex(
                name: "IX_TopicAssessments_TopicId",
                table: "TopicAssessments");

            migrationBuilder.DropIndex(
                name: "IX_StudentAssessments_TopicId",
                table: "StudentAssessments");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "StudentAssessments");
        }
    }
}
