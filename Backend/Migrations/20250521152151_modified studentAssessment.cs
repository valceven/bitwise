using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class modifiedstudentAssessment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Classrooms_ClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropIndex(
                name: "IX_StudentAssessments_ClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropColumn(
                name: "ClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "StudentAssessments");

            migrationBuilder.RenameColumn(
                name: "rank",
                table: "Leaderboards",
                newName: "Rank");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "StudentAssessments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "StudentAssessments",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessments_AssessmentId",
                table: "StudentAssessments",
                column: "AssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessments_TopicId",
                table: "Assessments",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assessments_Topics_TopicId",
                table: "Assessments",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Assessments_AssessmentId",
                table: "StudentAssessments",
                column: "AssessmentId",
                principalTable: "Assessments",
                principalColumn: "AssessmentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assessments_Topics_TopicId",
                table: "Assessments");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Assessments_AssessmentId",
                table: "StudentAssessments");

            migrationBuilder.DropIndex(
                name: "IX_StudentAssessments_AssessmentId",
                table: "StudentAssessments");

            migrationBuilder.DropIndex(
                name: "IX_Assessments_TopicId",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "StudentAssessments");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "StudentAssessments");

            migrationBuilder.RenameColumn(
                name: "Rank",
                table: "Leaderboards",
                newName: "rank");

            migrationBuilder.AddColumn<int>(
                name: "ClassroomId",
                table: "StudentAssessments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TopicId",
                table: "StudentAssessments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessments_ClassroomId",
                table: "StudentAssessments",
                column: "ClassroomId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Classrooms_ClassroomId",
                table: "StudentAssessments",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
