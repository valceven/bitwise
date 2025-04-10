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
using backend.Repositories;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IStudentRepository _studentRepository;
        private ITeacherRepository _teacherRepository;

        public UserService(
            IUserRepository userRepository,
            IStudentRepository studentRepository,
            ITeacherRepository teacherRepository)
        {
            _userRepository = userRepository;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
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
                UserID = user.UserId,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType,
                IsVerified = user.IsVerified
            };
        }

        public async Task<UserResponseDto?> UpdateUserAsync(int id, UserUpdateDto userUpdateDto)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null) return null;

            if (!user.IsVerified)
            {
                if (user.UserType == 1 && userUpdateDto.StudentIdNumber != null)
                {
                    var student = new Student
                    {
                        StudentId = user.UserId,
                        StudentIdNumber = userUpdateDto.StudentIdNumber
                    };

                    await _studentRepository.AddAsync(student);
                    user.IsVerified = true;
                }
                else if (user.UserType == 2 && userUpdateDto.TeacherIdNumber != null)
                {
                    var teacher = new Teacher
                    {
                        TeacherId = user.UserId,
                        TeacherIdNumber = userUpdateDto.TeacherIdNumber
                    };

                    await _teacherRepository.AddAsync(teacher);
                    user.IsVerified = true;
                }
            }

            user = await _userRepository.UpdateUserAsync(user.UserId, userUpdateDto);

            var UserResponseDto = new UserResponseDto
            {
                UserID = user.UserId,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType,
                IsVerified = user.IsVerified
            };


            if (user.UserType == 1 && user.IsVerified) // student
            {
                var student = await _studentRepository.GetByUserIdAsync(id);
                if (student != null)
                {
                    UserResponseDto.StudentInfo = new StudentDto
                    {
                        StudentIdNumber = student.StudentIdNumber
                    };
                }
            }
            else if (user.UserType == 2 && user.IsVerified) // teacher
            {
                var teacher = await _teacherRepository.GetByUserIdAsync(id);
                if (teacher != null)
                {
                    UserResponseDto.TeacherInfo = new TeacherDto
                    {
                        TeacherIdNumber = teacher.TeacherIdNumber
                    };
                }
            }
           
            return UserResponseDto;
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return users.Select(user => new UserResponseDto
            {
                UserID = user.UserId,
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
