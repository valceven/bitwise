using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [StringLength(50)]
        [Column(TypeName = "text")]
        public string Name { get; set; }

        [StringLength(50)]
        [Column(TypeName = "text")]
        public required string Email { get; set; }

        [StringLength(50)]
        [Column(TypeName = "text")]
        public required string Password { get; set; }

        public byte UserType { get; set; } // 1: user 2 : teacher 7: admin

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}