using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Assessment
    {
        [Key]
        public int AssessmentId { get; set; }

        [Required]
        [ForeignKey("Topic")]
        public int TopicId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(25)")]
        public string Title { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public string Type { get; set; } // e.g., "Quiz", "Test", "Assignment"

    }
}