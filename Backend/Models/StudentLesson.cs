
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class StudentLesson
    {
        [Required]  
        [Key]
        public int StudentLessonId { get; set; }
        [Required]
        [ForeignKey("StudentClassroom")]
        public int StudentClassroomId { get; set; }
        public StudentClassroom StudentClassroom { get; set; }
        [Required]
        [ForeignKey("Lesson")]
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool IsViewed { get; set; } = false;
        public DateTime ViewedAt { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}