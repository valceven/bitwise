using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ClassroomLesson
    {
        // not working since hardcoded pa ang lessons
        [Key]
        public int ClassroomLessonId { get; set; }

        [Required]
        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }

        [Required]
        [ForeignKey("Lesson")]
        public int LessonId { get; set; }
        public Lesson Lesson { get; set;}

        public bool IsVisibleToStudents { get; set; } = true;
    }
}