using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Lesson
    {        // not working since hardcoded pa ang lessons
        [Key]
        public int LessonId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public required string Title { get; set; }
        public string Description { get; set; } 

        [ForeignKey("CreatedById")]
        public int? CreatedBy { get; set; } // null if created by admin

        public int Order { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Topic> Topics { get; set; } = new List<Topic>();
        
    }
}