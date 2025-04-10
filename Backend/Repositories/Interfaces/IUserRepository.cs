using backend.DTOs.User;
using backend.Models;
using backend.Repositories;

namespace backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByIdAsync(int id);
        Task<User> CreateUserAsync(User user);
        Task<User?> UpdateUserAsync(int id, UserUpdateDto user);
        Task<bool> DeleteUserAsync(int id);
        Task UpdateUserTokenAsync(User user);
        
    }
}