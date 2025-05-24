using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class StudentTopic
    {
        [Key]
        public int StudentTopicId { get; set; }
        [Required]
        [ForeignKey("StudentClassroom")]
        public int StudentClassroomId { get; set; }
        public StudentClassroom StudentClassroom { get; set; }
        [Required] 
        [ForeignKey("Topic")]
        public int TopicId { get; set; }
        public Topic Topic { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsViewed { get; set; } = false;
        public DateTime ViewedAt { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}