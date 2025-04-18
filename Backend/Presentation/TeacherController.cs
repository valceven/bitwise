using backend.DTOs.Teacher;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace backend.Presentation
{
    [Route("api/teacher")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        public readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpPost("accept-student")]
       public async Task<IActionResult> AcceptStudent([FromBody] AcceptStudentDto acceptStudentDto)
        {
            if (acceptStudentDto == null)
            {
                return BadRequest("Invalid data provided.");
            }

            try
            {
                bool result;

                if (acceptStudentDto.Status)
                {
                    result = await _teacherService.AcceptStudentAsync(acceptStudentDto);
                }
                else
                {
                    result = await _teacherService.RejectStudentAsync(acceptStudentDto);
                }

                if (!result)
                {
                    return NotFound("Student request not found or already processed.");
                }

                var message = acceptStudentDto.Status
                    ? "Student has been successfully accepted."
                    : "Student has been rejected.";

                return Ok(new { message });
            }
            catch (Exception ex)
            {
                // Ideally log exception to a logger like Serilog or NLog
                return StatusCode(500, new
                {
                    message = "An error occurred while processing the request.",
                    error = ex.Message
                });
            }
        }
    }
}