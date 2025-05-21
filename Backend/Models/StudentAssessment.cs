using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class StudentAssessment
    {
        [Key]
        public int StudentAssessmentId { get; set; }
        [Required]
        [ForeignKey("StudentId")]
        public int StudentId { get; set; }
        public Student Student { get; set; }

        [Required]
        [ForeignKey("AssessmentId")]
        public int AssessmentId { get; set; }
        public Assessment Assessment { get; set; }
        public double Score { get; set; }
        public bool IsCompleted { get; set; } = false;
        public DateTime SubmittedAt { get; set; }
        public DateTime StartTime { get; set; }
    }
}