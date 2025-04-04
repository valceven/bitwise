using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]
        public required string Name { get; set; }

        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]
        public required string Email { get; set; }

        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]
        public required string Password { get; set; }

        [Required]
        public byte UserType { get; set; } // 1: user 2 : teacher 7: admin

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}