using backend.DTOs.User;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;

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

        // Login User and generate JWT
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> LoginUser([FromBody] UserLoginDto loginDto)
        {
            try
            {
                var response = await _authService.LoginUserAsync(loginDto);

                Response.Cookies.Append("AccessToken", response.AccessToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(1)
                });

                Response.Cookies.Append("RefreshToken", response.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(3)
                });

                return Ok(new
                {
                    Message = "Authenticated",
                    AccessToken = response.AccessToken,
                    User = response.User
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }

        // Returns refres token to the client
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto refreshDto)
        {
            var result = await _authService.RefreshTokenAsync(refreshDto);
            return result == null ? Unauthorized("Invalid or expired refresh token.") : Ok(result);
        }
        

    }
}
