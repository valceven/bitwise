using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Lesson
    {
        
        [Key]
        public int LessonId { get; set; }

        [Required]
        [ForeignKey("ClassroomId")]
        public int ClassroomId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public required string LessonName { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public List<Topic> Topics { get; set; } = new List<Topic>();
    }
}