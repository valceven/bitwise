using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.User;
using backend.Models;
using backend.Repositories.Interfaces;

namespace backend.Services
{
    public class UserService
    {
         private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<List<User>> GetAllUsersAsync() => _userRepository.GetAllUsersAsync();

        public Task<User?> GetUserByIdAsync(int id) => _userRepository.GetUserByIdAsync(id);

        public Task<User> CreateUserAsync(UserRegisterDto userDto)
        {
            string hashedPassword = HashPassword(userDto.Password);

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = hashedPassword,
                UserType = userDto.UserType
            };

            return _userRepository.CreateUserAsync(user);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public Task<User?> UpdateUserAsync(int id, User user) => _userRepository.UpdateUserAsync(id, user);

        public Task<bool> DeleteUserAsync(int id) => _userRepository.DeleteUserAsync(id);
    }
    
}