using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Classroom
    {
        [Key]
        public int ClassroomID { get; set; }

        public int TeacherId { get; set; }
        [Required]
        [ForeignKey("TeacherId")]
        public Teacher Teacher { get; set; } // Navigation property to Teacher

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public string ClassName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string ClassCode { get; set; } = string.Empty;

        // One-to-many: Classroom has many Students
        public ICollection<StudentClassroom>? StudentClassrooms { get; set; }

        // One-to-many: Classroom has many Lessons (assuming Lesson model exists)
        public List<Lesson>? Lessons { get; set; }
    }
}
