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

        
    }
}