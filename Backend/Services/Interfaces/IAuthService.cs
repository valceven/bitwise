using backend.DTOs.User;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> VerifyUserAsync (UserVerifyDto userVerifyDto);
        Task<User> RegisterUserAsync (UserRegisterDto user);
        Task<AuthResponseDto> LoginUserAsync (UserLoginDto user);
        Task LogoutUserAsync (string email);
        Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto refreshDto);
    }
}