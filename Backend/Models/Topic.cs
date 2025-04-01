using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Topic
    {
        [Key]
        public int TopicId { get; set; }

        [Required]
        [ForeignKey("Lesson")]
        public int LessonId { get; set; }

        [Column(TypeName = "varchar(25)")]
        public required string TopicName { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}