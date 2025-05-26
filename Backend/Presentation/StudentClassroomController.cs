using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/studentClassroom")]
    [ApiController]
    public class StudentClassroom : ControllerBase
    {
        private readonly IStudentClassroomService _studentClassroomService;
        public StudentClassroom(IStudentClassroomService studentClassroomService)
        {
            _studentClassroomService = studentClassroomService;
        }

        [HttpDelete("remove-student-from-classroom")]
        public async Task<IActionResult> RemoveStudentFromClassroom([FromQuery] int studentId, int classroomId)
        {
            var result = await _studentClassroomService.RemoveStudentFromClassroomAsync(studentId, classroomId);

            if (result)
            {
                return Ok(new { message = "Student Successfully Removed." });
            }

            return BadRequest(new { message = "Unexpected Error Occurred" });
        }
        [HttpGet("get-student-progress-by-StudentClassroom-id")]
        public async Task<IActionResult> GetStudentProgressByClassroomId([FromQuery] int studentClassroomId)
        {
            var result = await _studentClassroomService.GetStudentProgressByClassroomIdAsync(studentClassroomId);

            if (result != null)
            {
                return Ok(new { message = "Student Progress Fetched Successfully", progress = result });
            }

            return NotFound(new { message = "No Progress Found for this Student" });
        }
        
    }
}