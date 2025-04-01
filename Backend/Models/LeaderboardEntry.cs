using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class LeaderboardEntry
    {
        [Key]
        public int LeaderboardEntryId { get; set; }

        [ForeignKey("Leaderboard")]
        public int LeaderboardId { get; set; }

        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [Required]
        public int Score { get; set; }

        [Required]
        public int Rank { get; set; } // Rank of the student in the leaderboard

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}