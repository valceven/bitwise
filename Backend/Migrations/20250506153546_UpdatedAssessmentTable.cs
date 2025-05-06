using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedAssessmentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Assessments_AssessmentId",
                table: "StudentAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Topics_TopicId",
                table: "StudentAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentTopics_Topics_TopicId",
                table: "StudentTopics");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicAssessments_Assessments_AssessmentId",
                table: "TopicAssessments");

            migrationBuilder.DropForeignKey(
                name: "FK_TopicAssessments_Topics_TopicId",
                table: "TopicAssessments");

            migrationBuilder.DropTable(
                name: "LeaderboardEntries");

            migrationBuilder.DropIndex(
                name: "IX_TopicAssessments_AssessmentId",
                table: "TopicAssessments");

            migrationBuilder.DropIndex(
                name: "IX_TopicAssessments_TopicId",
                table: "TopicAssessments");

            migrationBuilder.DropIndex(
                name: "IX_StudentTopics_TopicId",
                table: "StudentTopics");

            migrationBuilder.DropIndex(
                name: "IX_StudentAssessments_AssessmentId",
                table: "StudentAssessments");

            migrationBuilder.DropIndex(
                name: "IX_StudentAssessments_TopicId",
                table: "StudentAssessments");

            migrationBuilder.RenameColumn(
                name: "AssessmentId",
                table: "Leaderboards",
                newName: "rank");

            migrationBuilder.AddColumn<int>(
                name: "ClassroomId",
                table: "StudentAssessments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<double>(
                name: "Score",
                table: "Leaderboards",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "ClassroomId",
                table: "Leaderboards",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StudentAssessmentID",
                table: "Leaderboards",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessments_ClassroomId",
                table: "StudentAssessments",
                column: "ClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_ClassroomId",
                table: "Leaderboards",
                column: "ClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_StudentAssessmentID",
                table: "Leaderboards",
                column: "StudentAssessmentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaderboards_Classrooms_ClassroomId",
                table: "Leaderboards",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Leaderboards_StudentAssessments_StudentAssessmentID",
                table: "Leaderboards",
                column: "StudentAssessmentID",
                principalTable: "StudentAssessments",
                principalColumn: "StudentAssessmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Classrooms_ClassroomId",
                table: "StudentAssessments",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaderboards_Classrooms_ClassroomId",
                table: "Leaderboards");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaderboards_StudentAssessments_StudentAssessmentID",
                table: "Leaderboards");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentAssessments_Classrooms_ClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropIndex(
                name: "IX_StudentAssessments_ClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropIndex(
                name: "IX_Leaderboards_ClassroomId",
                table: "Leaderboards");

            migrationBuilder.DropIndex(
                name: "IX_Leaderboards_StudentAssessmentID",
                table: "Leaderboards");

            migrationBuilder.DropColumn(
                name: "ClassroomId",
                table: "StudentAssessments");

            migrationBuilder.DropColumn(
                name: "ClassroomId",
                table: "Leaderboards");

            migrationBuilder.DropColumn(
                name: "StudentAssessmentID",
                table: "Leaderboards");

            migrationBuilder.RenameColumn(
                name: "rank",
                table: "Leaderboards",
                newName: "AssessmentId");

            migrationBuilder.AlterColumn<int>(
                name: "Score",
                table: "Leaderboards",
                type: "integer",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.CreateTable(
                name: "LeaderboardEntries",
                columns: table => new
                {
                    LeaderboardEntryId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LeaderboardId = table.Column<int>(type: "integer", nullable: false),
                    Rank = table.Column<int>(type: "integer", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false),
                    StudentId = table.Column<int>(type: "integer", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaderboardEntries", x => x.LeaderboardEntryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TopicAssessments_AssessmentId",
                table: "TopicAssessments",
                column: "AssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TopicAssessments_TopicId",
                table: "TopicAssessments",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentTopics_TopicId",
                table: "StudentTopics",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessments_AssessmentId",
                table: "StudentAssessments",
                column: "AssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessments_TopicId",
                table: "StudentAssessments",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Assessments_AssessmentId",
                table: "StudentAssessments",
                column: "AssessmentId",
                principalTable: "Assessments",
                principalColumn: "AssessmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAssessments_Topics_TopicId",
                table: "StudentAssessments",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentTopics_Topics_TopicId",
                table: "StudentTopics",
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
    }
}
