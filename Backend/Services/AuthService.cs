using backend.Models;
using backend.Repositories.Interfaces;
using backend.DTOs.User;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IStudentRepository _studentRepository;
        private readonly ITeacherRepository _teacherRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IEmailService _emailService;

        public AuthService(
            IUserRepository userRepository, 
            ITokenService tokenService, 
            IStudentRepository studentRepository, 
            ITeacherRepository teacherRepository,
            IAuthRepository authRepository,
            IEmailService emailService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
            _authRepository = authRepository;
            _emailService = emailService;
        }

        // Register User
        public async Task<User> RegisterUserAsync(UserRegisterDto userRegisterDto)
        {
            ValidateUserRegistration(userRegisterDto);

            var pendingUserVerificationCode = await _authRepository.GetPendingUserVerificationCodeAsync(userRegisterDto.Email);
            
            if (pendingUserVerificationCode != userRegisterDto.VerificationCode)
            {
                // Invalid verification code
                throw new InvalidOperationException("Invalid verification code.");
            }


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

            var UserResponseDto = new UserResponseDto
            {
                UserID = user.UserId,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType,
                IsVerified = user.IsVerified
            };

            // Add this based on user type
            if (user.IsVerified)
            {
                if (user.UserType == 1) // student
                {
                    var student = await _studentRepository.GetByUserIdAsync(user.UserId);
                    if (student != null)
                    {
                        UserResponseDto.StudentInfo = new StudentDto
                        {
                            StudentIdNumber = student.StudentIdNumber
                        };
                    }
                }
                else if (user.UserType == 2) // teacher
                {
                    var teacher = await _teacherRepository.GetByUserIdAsync(user.UserId);
                    if (teacher != null)
                    {
                        UserResponseDto.TeacherInfo = new TeacherDto
                        {
                            TeacherIdNumber = teacher.TeacherIdNumber
                        };
                    }
                }
            }
            
            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                User = UserResponseDto
            };
        }
        // Logout User
        public async Task LogoutUserAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
                throw new InvalidOperationException("User not found.");

            user.RefreshToken = null;
            user.RefreshTokenExpiry = null;

            await _userRepository.UpdateUserTokenAsync(user);
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

        public async Task<string> VerifyUserAsync(UserVerifyDto userVerifyDto)
        {
            // Generate a new code
            var code = new Random().Next(100000, 999999);

            // Check if already pending
            var pendingUser = await _authRepository.GetPendingUserByEmailAsync(userVerifyDto.Email);

            if (pendingUser != null)
            {
                // Update existing pending record
                pendingUser.VerificationCode = code;
                await _authRepository.UpdatePendingUserAsync(pendingUser);
            }
            else
            {
                // Save new pending user
                await _authRepository.CreatePendingUserAsync(new PendingUser
                {
                    Email = userVerifyDto.Email,
                    VerificationCode = code
                });
            }

            // Send email
            await _emailService.SendEmailAsync(userVerifyDto.Email, "Your Verification Code", $"Code: {code}");

            return "Verification code sent to your email.";
        }
    }
}
