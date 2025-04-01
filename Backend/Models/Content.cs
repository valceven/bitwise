using System.Collections.Generic;
using Stsystem.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Content
    {
        [Key]
        public int ContentId { get; set; }

        [Required]
        [ForeignKey("Topic")]
        public int TopicId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string ContentName { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}