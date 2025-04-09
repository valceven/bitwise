using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Classroom
    {
        [Key]
        public int ClassroomID { get; set; }

        [Required]
        [ForeignKey("TeacherID")]
        public int TeacherID { get; set; }

        [StringLength(25)]
        [Column(TypeName = "text")]
        public required string ClassName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property daw ani si Copilot;
        public List<Student>? Students { get; set; } = new List<Student>();

        // Navigation property for the lessons;
        public List<Lesson>? Lessons { get; set; } = new List<Lesson>();
    }
}