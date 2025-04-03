using backend.DTOs.User;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            var user = new backend.Models.User
            {
                Email = userRegisterDto.User.Email,
                Password = userRegisterDto.Password,
                UserType = userRegisterDto.User.UserType,
                Name = userRegisterDto.User.Name,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var newUser = await _authService.RegisterUserAsync(user);
            return CreatedAtAction(nameof(Register), new { id = newUser.UserID }, newUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            var token = await _authService.AuthenticateUserAsync(loginDto.Email, loginDto.Password);
            if (token == null) return Unauthorized("Invalid credentials");

            return Ok(new { Token = token });
        }
    }
}