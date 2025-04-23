using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Content
    {
        [Key]
        public int ContentId { get; set; }

        [Required]
        [ForeignKey("TopicId")]
        public int TopicId { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public required string Context { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int Order {get; set;}
    }
}