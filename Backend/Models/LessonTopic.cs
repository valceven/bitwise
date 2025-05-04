
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class LessonTopic
    {
        [Key]
        public int LessonTopicId { get; set; }
        [Required]
        [ForeignKey("Lesson")]
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        [Required]
        [ForeignKey("Topic")]
        public int TopicId { get; set; }
        public Topic Topic { get; set; }
    }
}