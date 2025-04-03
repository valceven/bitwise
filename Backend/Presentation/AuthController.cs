using backend.Models;
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
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var newUser = await _authService.RegisterUserAsync(user);
            return CreatedAtAction(nameof(Register), new { id = newUser.UserID }, newUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var token = await _authService.LoginUserAsync(user.Email, user.Password);
            if (token == null) return Unauthorized("Invalid credentials");

            return Ok(new { Token = token });
        }
    }
}