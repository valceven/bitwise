using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Assessment
    {
        [Key]
        public int AssessmentId { get; set; }

        [Required]
        [ForeignKey("TopicId")]
        public int TopicId { get; set; }
        public ICollection<StudentAssessmentResult> StudentAssessmentResults { get; set; } = new List<StudentAssessmentResult>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}