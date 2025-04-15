using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public enum JoinStatus
    {
        Pending,
        Accepted,
        Rejected
    }
    public class StudentClassroom
    {
        [Key]
        public int StudentClassroomId { get; set; }

        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
        

        [Required]
        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public JoinStatus Status { get; set; } = JoinStatus.Pending;
    }
}