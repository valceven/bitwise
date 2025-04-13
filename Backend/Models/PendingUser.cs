using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class PendingUser
    {
        [Key]
        public int PendingUserId { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string Email { get; set; }
        public int VerificationCode { get; set; }
    }
}