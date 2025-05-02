using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialUpdateToAssessment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Assessments");

            migrationBuilder.RenameColumn(
                name: "DueDate",
                table: "Assessments",
                newName: "CreatedAt");

            migrationBuilder.CreateTable(
                name: "StudentAssessmentResult",
                columns: table => new
                {
                    StudentAssessmentResultId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StudentId = table.Column<int>(type: "integer", nullable: false),
                    AssessmentId = table.Column<int>(type: "integer", nullable: false),
                    Score = table.Column<double>(type: "double precision", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentAssessmentResult", x => x.StudentAssessmentResultId);
                    table.ForeignKey(
                        name: "FK_StudentAssessmentResult_Assessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "Assessments",
                        principalColumn: "AssessmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentAssessmentResult_AssessmentId",
                table: "StudentAssessmentResult",
                column: "AssessmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentAssessmentResult");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Assessments",
                newName: "DueDate");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Assessments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Assessments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
