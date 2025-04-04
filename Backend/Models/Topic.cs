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

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}