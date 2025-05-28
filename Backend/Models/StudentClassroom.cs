using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class StudentClassroom
    {
        [Key]
        public int StudentClassroomId { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public int ClassroomId { get; set; }

        public string ClassCode { get; set; }
        public double TotalScore { get; set; } = 0;

        public Student Student { get; set; }
        public Classroom Classroom { get; set; }
    }
}
