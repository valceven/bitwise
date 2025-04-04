using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Leaderboard
    {
        [Key]
        public int LeaderboardId { get; set; }

        [Required]
        [ForeignKey("AssessmentId")]
        public int AssessmentId { get; set; }

        [Required]
        public int Score { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;        
    }
}