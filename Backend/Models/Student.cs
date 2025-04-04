using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models 
{
    public class Student : User
    {
        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public int StudentIdNumber { get; set; }

        [ForeignKey("ClassroomId")]
        public int ClassroomId { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}