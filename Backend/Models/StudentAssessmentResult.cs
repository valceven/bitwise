using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class StudentAssessmentResult
    {
        [Key]
        public int StudentAssessmentResultId { get; set; }
        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        [Required]
        [ForeignKey("Assessment")]
        public int AssessmentId { get; set; }

        public double Score { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}