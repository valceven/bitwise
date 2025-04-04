using backend.DTOs.User;
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
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {   
            Console.WriteLine("Registering user: " + userDto.Name);
            var newUser = await _authService.RegisterUserAsync(userDto);
            return CreatedAtAction(nameof(Register), new { id = newUser.UserID }, newUser);
        }

        // [HttpPost("login")]
        // public async Task<IActionResult> Login([FromBody] UserRegisterDto userDto)
        // {
        //     var token = await _authService.LoginUserAsync(userDto);
        //     if (token == null) return Unauthorized("Invalid credentials");

        //     return Ok(new { Token = token });
        // }
    }
}