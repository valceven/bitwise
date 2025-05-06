using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class TopicAssessment
    {
        [Key]
        public int TopicAssessmentId { get; set; }
        [Required]
        public int AssessmentId { get; set; }
        [Required]
        public int TopicId { get; set; }
    }
}