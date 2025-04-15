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

        public ICollection<StudentClassroom> StudentClassrooms { get; set; } 

        // Navigation property to User
        public User User { get; set; }
    }
}
