using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models {
    public class Student : User
    {
        [Required]
        [StringLength(25)]
        [Column(TypeName = "nvarchar(25)")]
        public int StudentIdNumber { get; set; }

        [ForeignKey("Classroom")]
        public int ClassroomId { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}