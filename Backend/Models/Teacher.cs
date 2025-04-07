using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Teacher
    {
        [Key]
        [ForeignKey("UserID")]
        public int TeacherId { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public string TeacherIdNumber { get; set; }

        public List<Classroom> Classrooms { get; set; } = new List<Classroom>();
    }

}