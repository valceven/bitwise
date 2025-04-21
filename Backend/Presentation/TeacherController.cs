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
            try
            {
                bool result;
                string message;
      
                result = await _teacherService.AcceptStudentAsync(acceptStudentDto);
                
                if (!result)
                {
                    return NotFound("Student request not found or already processed.");
                }

                message = "Student has been successfully accepted.";

                return Ok(new { message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while processing the request.",
                    error = ex.Message
                });
            }
        }

        [HttpPost("reject-student")]
        public async Task<IActionResult> RejectStudent([FromBody] AcceptStudentDto acceptStudentDto)
        {
            try
            {
                bool result;
                string message;
      
                result = await _teacherService.RejectStudentAsync(acceptStudentDto);
                
                if (!result)
                {
                    return NotFound("Student request not found or already processed.");
                }

                message = "Student has been successfully rejected.";

                return Ok(new { message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while processing the request.",
                    error = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> FetchPendingStudents([FromQuery] FetchPendingStudentsDto fetchPendingStudentsDto)
        {
            var result = await _teacherService.FetchPendingStudentsAsync(fetchPendingStudentsDto);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }

}