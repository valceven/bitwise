using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateddatabasepart2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classrooms_Teachers_TeacherId",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "TeacherId",
                table: "Classrooms",
                newName: "TeacherID");

            migrationBuilder.RenameIndex(
                name: "IX_Classrooms_TeacherId",
                table: "Classrooms",
                newName: "IX_Classrooms_TeacherID");

            migrationBuilder.AddForeignKey(
                name: "FK_Classrooms_Teachers_TeacherID",
                table: "Classrooms",
                column: "TeacherID",
                principalTable: "Teachers",
                principalColumn: "TeacherID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classrooms_Teachers_TeacherID",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "TeacherID",
                table: "Classrooms",
                newName: "TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Classrooms_TeacherID",
                table: "Classrooms",
                newName: "IX_Classrooms_TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Classrooms_Teachers_TeacherId",
                table: "Classrooms",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
