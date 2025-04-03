using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.User
{
    public class UserRegisterDto
    {
        public required backend.Models.User User { get; set; } // Fully qualify the User type
        public required string Password { get; set; }
    }
}

