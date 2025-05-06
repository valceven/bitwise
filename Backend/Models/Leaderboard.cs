using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Leaderboard
    {
        [Key]
        public int LeaderboardId { get; set; }

        [Required]
        [ForeignKey("StudentAssessment")]
        public int StudentAssessmentID {get; set;}
        public StudentAssessment studentAssessment {get; set;}
        [Required]
        [ForeignKey("Classroom")]
        public int ClassroomId {get; set;}
        public Classroom classroom {get; set;}
        public int rank {get; set;}
        public double Score { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;        
    }
}