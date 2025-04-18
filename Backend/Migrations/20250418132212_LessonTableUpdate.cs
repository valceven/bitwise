using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class LessonTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Classrooms_ClassroomId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentClassrooms_Classrooms_ClassroomId",
                table: "StudentClassrooms");

            migrationBuilder.DropIndex(
                name: "IX_StudentClassrooms_ClassroomId",
                table: "StudentClassrooms");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "StudentClassrooms");

            migrationBuilder.RenameColumn(
                name: "ClassroomId",
                table: "Lessons",
                newName: "ClassroomID");

            migrationBuilder.RenameColumn(
                name: "LessonName",
                table: "Lessons",
                newName: "Title");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_ClassroomId",
                table: "Lessons",
                newName: "IX_Lessons_ClassroomID");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Topics",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Topics",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClassroomID",
                table: "Students",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClassroomID",
                table: "Lessons",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Lessons",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Lessons",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Lessons",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ClassroomLesson",
                columns: table => new
                {
                    ClassroomLessonId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClassroomId = table.Column<int>(type: "integer", nullable: false),
                    LessonId = table.Column<int>(type: "integer", nullable: false),
                    IsVisibleToStudents = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassroomLesson", x => x.ClassroomLessonId);
                    table.ForeignKey(
                        name: "FK_ClassroomLesson_Classrooms_ClassroomId",
                        column: x => x.ClassroomId,
                        principalTable: "Classrooms",
                        principalColumn: "ClassroomID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassroomLesson_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_ClassroomID",
                table: "Students",
                column: "ClassroomID");

            migrationBuilder.CreateIndex(
                name: "IX_ClassroomLesson_ClassroomId",
                table: "ClassroomLesson",
                column: "ClassroomId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassroomLesson_LessonId",
                table: "ClassroomLesson",
                column: "LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Classrooms_ClassroomID",
                table: "Lessons",
                column: "ClassroomID",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Classrooms_ClassroomID",
                table: "Students",
                column: "ClassroomID",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Classrooms_ClassroomID",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Classrooms_ClassroomID",
                table: "Students");

            migrationBuilder.DropTable(
                name: "ClassroomLesson");

            migrationBuilder.DropIndex(
                name: "IX_Students_ClassroomID",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "ClassroomID",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Lessons");

            migrationBuilder.RenameColumn(
                name: "ClassroomID",
                table: "Lessons",
                newName: "ClassroomId");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Lessons",
                newName: "LessonName");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_ClassroomID",
                table: "Lessons",
                newName: "IX_Lessons_ClassroomId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "StudentClassrooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ClassroomId",
                table: "Lessons",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentClassrooms_ClassroomId",
                table: "StudentClassrooms",
                column: "ClassroomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Classrooms_ClassroomId",
                table: "Lessons",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentClassrooms_Classrooms_ClassroomId",
                table: "StudentClassrooms",
                column: "ClassroomId",
                principalTable: "Classrooms",
                principalColumn: "ClassroomID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
