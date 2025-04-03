using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.User
{
    public class UserResponseDto
    {
        public int UserID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required byte UserType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}