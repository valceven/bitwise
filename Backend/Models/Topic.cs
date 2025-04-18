using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Topic
    {
        [Key]
        public int TopicId { get; set; }

        [Required]
        [ForeignKey("Lesson")]
        public int LessonId { get; set; }

        [Column(TypeName = "text")]
        public required string TopicName { get; set; }
        [Column(TypeName = "text")]
        public string Content { get; set; }
        public int Order { get; set; } // for ordering topics within a lesson
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}