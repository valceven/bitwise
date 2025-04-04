using backend.DTOs.User;
using backend.Models;
using backend.Repositories;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _authRepository;

        public AuthService(IUserRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public Task<User> LoginUserAsync(UserLoginDto user)
        {
            throw new NotImplementedException();
        }

        public Task<User> RegisterUserAsync(UserRegisterDto userDto)
        {
            string hashedPassword = HashPassword(userDto.Password);

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = hashedPassword,
                UserType = userDto.UserType
            };

            return _authRepository.CreateUserAsync(user);
        }

        internal Task LoginUserAsync(UserRegisterDto userDto)
        {
            throw new NotImplementedException();
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}