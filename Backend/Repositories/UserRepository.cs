using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly bitwiseDbContext _context;

        public UserRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        // Get a user by email
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        // Get all users
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        // Get a user by their ID
        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        // Create a new user
        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // Update an existing user
        public async Task<User?> UpdateUserAsync(int id, User user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null) return null;

            // Update user fields
            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.UserType = user.UserType;
            existingUser.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingUser;
        }

        // Delete a user by ID
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
