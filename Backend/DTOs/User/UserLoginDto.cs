using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.User
{
    public class UserLoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}