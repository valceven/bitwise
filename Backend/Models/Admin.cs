using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Admins")]
    public class Admin
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AdminID { get; set; }
        public string Passkey { get; set; }
    }
}