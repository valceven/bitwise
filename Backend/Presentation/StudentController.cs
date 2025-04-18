using backend.DTOs.Student;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/students")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost("join-classroom")]
        public async Task<IActionResult> JoinClassroom([FromBody] JoinClassroomDto joinClassroomDto)
        {
            var result = await _studentService.JoinClassroomAsync(joinClassroomDto);

            if (result != null)
            {
                return Ok(new { message = result.Message });
            }

            return BadRequest(new { message = result.Message });
        }

    }
}