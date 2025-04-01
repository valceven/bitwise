using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Assessment
    {
        [Key]
        public int AssessmentId { get; set; }

        [Required]
        [ForeignKey("Topic")]
        public int TopicId { get; set; }

        [Column(TypeName = "varchar(25)")]
        public required string Title { get; set; }

        public DateTime DueDate { get; set; }

        [Column(TypeName = "varchar(20)")]
        public required string Type { get; set; } // e.g., "Quiz", "Test", "Assignment"

    }
}