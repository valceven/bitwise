
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class StudentTopic
    {
        [Key]
        public int StudentTopicId { get; set; }
        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
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