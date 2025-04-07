using backend.DTOs.User;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> RegisterUserAsync (UserRegisterDto user);
        Task<AuthResponseDto> LoginUserAsync (UserLoginDto user);
        Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto refreshDto);
    }
}