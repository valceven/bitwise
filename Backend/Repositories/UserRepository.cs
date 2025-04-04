using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories.Interfaces;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly bitwiseDbContext _context;

        public UserRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            try {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                Console.WriteLine($"User created: {user.Name}");
                return user;
            } catch (Exception ex) {
                Console.WriteLine($"Error creating user: {ex.Message}");
                throw new Exception("An error occurred while creating the user.", ex);
            }
            
        }

        public async Task<User?> UpdateUserAsync(int id, User user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null) return null;

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.UserType = user.UserType;
            existingUser.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}