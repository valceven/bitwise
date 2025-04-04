using backend.DTOs.User;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserResponseDto?>> GetAllUsersAsync();
        Task<UserResponseDto?> GetUserByIdAsync(int id);
        Task<UserResponseDto> CreateUserAsync(UserRegisterDto user);
        Task<UserResponseDto?> UpdateUserAsync(int id, UserUpdateDto user);
        Task<bool> DeleteUserAsync(int id);
    }
}