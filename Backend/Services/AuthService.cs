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
            var email = userRegisterDto.Email;
            var password = userRegisterDto.Password;
            var name = userRegisterDto.Name;
            byte userType = userRegisterDto.UserType;

            // Check if the email is already in use
            var existingUser = await _userRepository.GetUserByEmailAsync(email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Email is already in use.");
            }

            // Create new user object
            var newUser = new User
            {
                Email = email,
                Name = name,
                Password = BCrypt.Net.BCrypt.HashPassword(password), // Hash the password
                UserType = userType,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return await _userRepository.CreateUserAsync(newUser);
        }

        // Login User and generate JWT
        public async Task<string> LoginUserAsync(UserLoginDto userLoginDto)
        {
            var email = userLoginDto.Email;
            var password = userLoginDto.Password;

            // Validate user credentials
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("Email and password are required.");
            }

            // Check if the user exists and verify the password
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            // Generate JWT token using TokenService
            return _tokenService.GenerateToken(user);

            
        }
    }
}
