using backend.DTOs.User;
using backend.Models;
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

        // Veify through otp code sent via email address.
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyUser([FromBody] UserVerifyDto userVerifyDto)
        {
            if(userVerifyDto.Password != userVerifyDto.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }

            var result = await _authService.VerifyUserAsync(userVerifyDto);

            if (!result.Success)
            {
                return BadRequest("Invalid OTP code.");
            }
            
            return Ok(result);
        }

        // Register User
        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {   

            var createdUser = await _authService.RegisterUserAsync(userRegisterDto);
            
            return CreatedAtAction(nameof(RegisterUser), new { id = createdUser.UserId }, createdUser);
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
        // Logout User
        [HttpPut("logout")]
        [Microsoft.AspNetCore.Cors.EnableCors("AllowFrontend")]
        public async Task<IActionResult> LogoutUser([FromBody] UserLogoutDto logoutDto)
        {
            try
            {
                // Delete cookies when logging out
                Response.Cookies.Delete("AccessToken");
                Response.Cookies.Delete("RefreshToken");

                // Handle other logout logic
                await _authService.LogoutUserAsync(logoutDto.Email);

                return Ok("Logged out successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
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
