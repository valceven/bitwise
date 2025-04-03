using backend.Models;
using backend.Services;
using backend.DTOs.User;
using Microsoft.AspNetCore.Mvc;
namespace backend.Presentation
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // Register User
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {
            var user = userRegisterDto.User;
            var password = userRegisterDto.Password;

            var createdUser = await _userService.RegisterUserAsync(user, password);
            return CreatedAtAction(nameof(RegisterUser), new { id = createdUser.UserID }, createdUser);
        }

        // Login User and get JWT
        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginUser([FromBody] UserLoginDto loginDto)
        {
            try
            {
                var token = await _userService.LoginUserAsync(loginDto.Email, loginDto.Password);
                return Ok(new { Token = token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }
    }
}
