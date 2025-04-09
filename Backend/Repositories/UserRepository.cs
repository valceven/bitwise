using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs.User;

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

        // Update an existing user
        public async Task<User?> UpdateUserAsync(int id, UserUpdateDto userUpdateDto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null) return null;

            if (userUpdateDto.Password.Length != 0 && !BCrypt.Net.BCrypt.Verify(userUpdateDto.Password, user.Password))
            {
                throw new UnauthorizedAccessException("Old password is incorrect.");
            }
            if (userUpdateDto.NewPassword.Length != 0) user.Password = BCrypt.Net.BCrypt.HashPassword(userUpdateDto.NewPassword);

            if (userUpdateDto.Name != null) user.Name = userUpdateDto.Name;
            if (userUpdateDto.Email != null) user.Email = userUpdateDto.Email;
            
            // if (userUpdateDto.DateOfBirth != null) user.DateOfBirth = userUpdateDto.DateOfBirth;
            // if (userUpdateDto.StudentIdNumber != null) user.StudentIdNumber = userUpdateDto.StudentIdNumber;
            // if (userUpdateDto.TeacherIdNumber != null) user.TeacherIdNumber = userUpdateDto.TeacherIdNumber;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return user;
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

        // Updates user token
        public async Task UpdateUserTokenAsync(User user){
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
