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
        public string Section { get; set; }
        public string Description { get; set; }
        public string ClassCode { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        // One-to-many: Classroom has many Lessons (assuming Lesson model exists)

        public List<Lesson>? Lessons { get; set; } = new List<Lesson>();

        public ICollection<StudentClassroom> StudentClassrooms { get; set; }
<<<<<<< HEAD
        public Teacher Teacher { get; set; }
=======

>>>>>>> 555fbb2406e3cbfa3dad44043b85f88517348a1d
    }
}
