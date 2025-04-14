using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly bitwiseDbContext _context;
    
        public AuthRepository(bitwiseDbContext context)
        {
            _context = context;
        }
        public async Task<PendingUser> CreatePendingUserAsync(PendingUser pendingUser)
        {
            try {
                await _context.PendingUsers.AddAsync(pendingUser);
                await _context.SaveChangesAsync();
                return pendingUser;
            } catch (Exception ex) {
                Console.WriteLine($"Error creating pending user: {ex.Message}");
                throw new Exception("An error occurred while creating the pending user.", ex);
            }
        }

        public async Task<PendingUser?> GetPendingUserByEmailAsync(string email)
        {   
            try {
                var pendingUser = await _context.PendingUsers.FirstOrDefaultAsync(u => u.Email == email);
            
                if (pendingUser != null) {
                    return pendingUser;
                } else {
                    return null;
                }
            } catch (Exception ex) {
                Console.WriteLine($"Error getting pending user: {ex.Message}");
                throw new Exception("An error occurred while getting the pending user.", ex);
            }
        }

        public async Task<int> GetPendingUserVerificationCodeAsync(string email)
        {
            try {
                int verificationCode = await _context.PendingUsers
                    .Where(u => u.Email == email)
                    .Select(u => u.VerificationCode)
                    .FirstOrDefaultAsync(); // Use await to asynchronously get the result
                return verificationCode;
            } catch (Exception ex) {
                Console.WriteLine($"Error getting pending user verification code: {ex.Message}");
                throw new Exception("An error occurred while getting the pending user verification code.", ex);
            }
        }

        public async Task<(bool Success, string Message)> UpdatePendingUserAsync(PendingUser pendingUser)
        {
            try {
                await _context.PendingUsers
                    .Where(u => u.Email == pendingUser.Email)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(u => u.VerificationCode, pendingUser.VerificationCode));
                await _context.SaveChangesAsync();
            } catch (Exception ex) {
                Console.WriteLine($"Error updating pending user: {ex.Message}");
                throw new Exception("An error occurred while updating the pending user.", ex);
            }
        }
    }
}