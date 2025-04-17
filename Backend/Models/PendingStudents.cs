using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class PendingStudents
    {
        [Key]
        public int PendingId {get; set;}

        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [Required]
        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }

        public string ClassCode { get; set; }
    }
}