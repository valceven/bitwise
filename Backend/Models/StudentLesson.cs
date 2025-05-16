
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
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public int LessonId { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool IsViewed { get; set; } = false;
        public DateTime ViewedAt { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}