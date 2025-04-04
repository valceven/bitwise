using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.User
{
    public class UserRegisterDto
    {   
        public  string Email { get; set; }
        public string Name { get; set; }
        public  string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}

