using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models 
{
    public class Student
    {
        [Key]
        [ForeignKey("UserID")]
        public int StudentID { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "text")]
        public string StudentIdNumber { get; set; }

        [ForeignKey("ClassroomId")]
        public int? ClassroomId { get; set; }

        public Classroom Classroom { get; set; }
    }

}