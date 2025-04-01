using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Classroom
    {
        [Key]
        public int ClassroomId { get; set; }

        [Required]
        [ForeignKey("Teacher")]
        public int TeacherId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "nvarchar(25)")]
        public string ClassName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property daw ani si Copilot;
        public List<Student> Students { get; set; } = new List<Student>();

        // Navigation property for the lessons;
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}