using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class StudentAssessment
    {
        [Key]
        public int StudentAssessmentId { get; set; }
        [Required]
        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }
        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
        [Required]
        public int AssessmentId { get; set; }
        [Required]
        public int TopicId { get; set; }
        public double Score { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}