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

        [HttpGet("fetch-classroom")]
        public async Task<IActionResult> FetchClassroom([FromQuery] int StudentId)
        {
            var result = await _studentService.FetchClassroomAsync(StudentId);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("No Classroom Found.");
        }

        [HttpGet("check-pending-status")]
        public async Task<IActionResult> CheckPendingStatus([FromQuery] int StudentId)
        {
            var result = await _studentService.CheckPendingStatusAsync(StudentId);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("No pending student error");
        }

        [HttpDelete("remove-pending-status")]
        public async Task<IActionResult> RemovePendingStatus([FromQuery] int pendingId)
        {
            var result = await _studentService.RemovePendingStatusAsync(pendingId);

            if (result == "Removed Pending Request Successfully")
                return Ok(result);

            return BadRequest(result);
        }

    }
}