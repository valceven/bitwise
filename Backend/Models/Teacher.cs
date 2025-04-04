using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Teacher : User
    {
        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public required string TeacherIdNumber { get; set; }

        public List<Classroom> Classrooms { get; set; } = new List<Classroom>();
    }
}