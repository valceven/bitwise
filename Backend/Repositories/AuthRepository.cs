using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        public Task<User> CreateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> LoginUserAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}