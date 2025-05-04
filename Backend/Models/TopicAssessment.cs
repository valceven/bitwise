using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class TopicAssessment
    {
        [Key]
        public int TopicAssessmentId { get; set; }
        [Required]
        [ForeignKey("Assessment")]
        public int AssessmentId { get; set; }
        public Assessment Assessment { get; set; }
        [Required]
        [ForeignKey("Topic")]
        public int TopicId { get; set; }
        public Topic Topic { get; set; }
    }
}