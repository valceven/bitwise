using backend.Models;
using backend.Repositories.Interfaces;
using BCrypt.Net;
using backend.Services; 
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using backend.DTOs.User;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            return new UserResponseDto
            {
                UserID = user.UserID,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType
            };
        }

        public async Task<UserResponseDto?> UpdateUserAsync(int id, UserUpdateDto userUpdateDto)
        {
            var user = await _userRepository.UpdateUserAsync(id, userUpdateDto);

            if (user == null)
            {
                return null;
            }

            return new UserResponseDto
            {
                UserID = user.UserID,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType
            };
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return users.Select(user => new UserResponseDto
            {
                UserID = user.UserID,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType
            }).ToList();
        }


        public Task<UserResponseDto> CreateUserAsync(UserRegisterDto user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        Task<List<UserResponseDto?>> IUserService.GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }
    }
}
