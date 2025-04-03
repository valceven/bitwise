using backend.DTOs.User;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> RegisterUserAsync (UserRegisterDto user);
        Task<User> LoginUserAsync (UserLoginDto user);
    }
}