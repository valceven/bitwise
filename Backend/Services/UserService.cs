using backend.Models;
using backend.Repositories.Interfaces;
using BCrypt.Net;
using backend.Services; 
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        // Register User
        public async Task<User> RegisterUserAsync(String email, string password)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Email is already in use.");
            }

            // Hash the password
            existingUser.Password = BCrypt.Net.BCrypt.HashPassword(password);
            return await _userRepository.CreateUserAsync(existingUser);
        }

        // Login User and generate JWT
        public async Task<string> LoginUserAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            // Create JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = _configuration["Auth:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
                {
                    throw new InvalidOperationException("JWT SecretKey is not configured.");
                }   
            var key = Encoding.ASCII.GetBytes(secretKey);   

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserID.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.UserType.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
