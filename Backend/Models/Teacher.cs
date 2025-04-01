using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Teacher : User
    {
        [Required]
        [StringLength(25)]
        [Column(TypeName = "nvarchar(25)")]
        public string TeacherIdNumber { get; set; }

        public List<Classroom> Classrooms { get; set; } = new List<Classroom>();
    }
}