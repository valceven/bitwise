using backend.Models;
using backend.Repositories.Interfaces;
using backend.DTOs.User;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AuthService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        // Register User
        public async Task<User> RegisterUserAsync(UserRegisterDto userRegisterDto)
        {
            ValidateUserRegistration(userRegisterDto);

            // Check if the email is already in use
            var existingUser = await _userRepository.GetUserByEmailAsync(userRegisterDto.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Email is already in use.");
            }

            // Create new user object
            var newUser = new User
            {
                Email = userRegisterDto.Email,
                Name = userRegisterDto.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Password),
                UserType = userRegisterDto.UserType,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return await _userRepository.CreateUserAsync(newUser);
        }

        // Login User and generate JWT
        public async Task<AuthResponseDto> LoginUserAsync(UserLoginDto userLoginDto)
        {
            var email = userLoginDto.Email;
            var password = userLoginDto.Password;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                throw new ArgumentException("Email and password are required.");

            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                throw new UnauthorizedAccessException("Invalid email or password.");

            //  Generate tokens
            var accessToken = _tokenService.GenerateToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7); // expires in 7 days
            await _userRepository.UpdateUserTokenAsync(user);

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto refreshDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(refreshDto.Email);
            if (user == null || user.RefreshToken != refreshDto.RefreshToken || user.RefreshTokenExpiry < DateTime.UtcNow)
            {
                return null; // invalid token or expired
            }

            var newAccessToken = _tokenService.GenerateToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateUserTokenAsync(user);

            return new AuthResponseDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }


        // Validate user registration data for a cleaner code
        // This method checks if the registration data is valid
        // and throws an exception if any required field is missing or invalid.

        private void ValidateUserRegistration(UserRegisterDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto), "Registration data is required.");

            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ArgumentException("Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ArgumentException("Password is required.");

            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Name is required.");

            if (dto.UserType == 0)
                throw new ArgumentException("User type is required.");
        }
    }
}
