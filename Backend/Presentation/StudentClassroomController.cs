using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/studentClassroom")]
    [ApiController]
    public class StudentClassroomController : ControllerBase
    {
        private readonly IStudentClassroomService _studentClassroomService;
        public StudentClassroomController(IStudentClassroomService studentClassroomService)
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
        public async Task<IActionResult> GetStudentProgressByClassroomId([FromQuery] int studentId)
        {
            var result = await _studentClassroomService.GetStudentProgressByClassroomIdAsync(studentId);

            if (result != null)
            {
                return Ok(new { message = "Student Progress Fetched Successfully", progress = result });
            }

            return NotFound(new { message = "No Progress Found for this Student" });
        }
        [HttpGet("get-student-scores-by-classroom-code")]
        public async Task<IActionResult> GetStudentScoresByClassroomCode([FromQuery] string classCode)
        {
            var result = await _studentClassroomService.GetStudentScoresByClassroomCodeAsync(classCode);

            if (result != null && result.Any())
            {
                return Ok(new { message = "Student Scores Fetched Successfully", scores = result });
            }

            return NotFound(new { message = "No Scores Found for this Classroom" });
        }
        [HttpGet("get-leaderboards-by-classroom-code")]
        public async Task<IActionResult> GetLeaderBoardsByClassroomCode([FromQuery] string classroomCode)
        {
            try
            {
                var leaderBoards = await _studentClassroomService.GetLeaderBoardsByClassroomCodeAsync(classroomCode);
                if (leaderBoards == null || !leaderBoards.Any())
                {
                    return NotFound(new { message = "No Leaderboards Found for this Classroom" });
                }
                return Ok(leaderBoards);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}