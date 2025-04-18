using backend.DTOs.User;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<(bool Success, string Message)> VerifyUserAsync(UserVerifyDto userVerifyDto);
        Task<User> RegisterUserAsync (UserRegisterDto user);
        Task<AuthResponseDto> LoginUserAsync (UserLoginDto user);
        Task LogoutUserAsync (string email);
        Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto refreshDto);
    }
}