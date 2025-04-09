using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Teacher
    {
        [Key]
        [ForeignKey("User")] // One-to-one relationship with User
        public int TeacherId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public string TeacherIdNumber { get; set; }

        // Navigation property to User
        public User User { get; set; }

        // One-to-many relationship: Teacher has many Classrooms
        public List<Classroom> Classrooms { get; set; } = new List<Classroom>();
    }
}
