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

        [Column(TypeName = "text")]
        public required string Title { get; set; }

        public DateTime DueDate { get; set; }

        [Column(TypeName = "text")]
        public required string Type { get; set; } // e.g., "Quiz", "Test", "Assignment"

    }
}