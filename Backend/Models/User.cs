using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }

        [Required]
        [StringLength(25)]
        [Column(TypeName = "nvarchar(25)")]
        public string Password { get; set; }

        [Required]
        public byte UserType { get; set; } // 1: user 2 : teacher 7: admin

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}