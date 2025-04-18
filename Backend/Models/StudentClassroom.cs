using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class StudentClassroom
    {
        [Key]
        public int StudentClassroomId { get; set; }

        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [Required]
        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }
        
        public string ClassCode { get; set; }
    }
}