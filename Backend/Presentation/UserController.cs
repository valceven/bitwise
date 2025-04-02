using backend.Models;
using backend.Services;
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

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return await _userService.GetAllUsersAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var createdUser = await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.UserID }, createdUser);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, User user)
        {
            var updatedUser = await _userService.UpdateUserAsync(id, user);
            if (updatedUser == null) return NotFound();
            return updatedUser;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
