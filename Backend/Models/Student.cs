using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models 
{
    public class Student
    {
        [Key]
        [ForeignKey("User")] // One-to-one relationship with User
        public int StudentId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public string StudentIdNumber { get; set; }

        // Optional many-to-one relationship: Student may belong to a Classroom
        public int? ClassroomId { get; set; }

        [ForeignKey("ClassroomId")]
        public Classroom? Classroom { get; set; }

        // Navigation property to User
        public User User { get; set; }
    }
}
