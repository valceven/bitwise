using backend.DTOs.User;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
namespace backend.Presentation
{
    [Route("api/users/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // Register User
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {   
            if(userRegisterDto.Password != userRegisterDto.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }
            Console.WriteLine(userRegisterDto);

            var createdUser = await _authService.RegisterUserAsync(userRegisterDto);
            
            return CreatedAtAction(nameof(RegisterUser), new { id = createdUser.UserID }, createdUser);
        }
    
        // Login User and get JWT
        // This method is responsible for authenticating the user and generating a JWT token. (wala rani aron ra naa koy ma push hehe)
        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginUser([FromBody] UserLoginDto loginDto)
        {
            try
            {
                var token = await _authService.LoginUserAsync(loginDto);
                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized("Invalid email or password.");
                }
                return Ok(new { Message = "Authenticated", Token = token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }
    }
}
