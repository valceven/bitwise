using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Classroom
    {
        [Key]
        public int ClassroomID { get; set; }

        [Required]
        [ForeignKey("TeacherId")]
        public int TeacherId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public string ClassName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string ClassCode { get; set; } = string.Empty;

        // One-to-many: Classroom has many Students
        public List<Student>? Students { get; set; } = new List<Student>();

        // One-to-many: Classroom has many Lessons (assuming Lesson model exists)
        public List<Lesson>? Lessons { get; set; } = new List<Lesson>();
    }
}
