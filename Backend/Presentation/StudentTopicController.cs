using backend.DTOs.StudentTopic;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/student-topic")]
    [ApiController]
    public class StudentTopicController : ControllerBase
    {
        private readonly IStudentTopicService _studentTopicService;
        public StudentTopicController(IStudentTopicService studentTopicService)
        {
            _studentTopicService = studentTopicService;
        }
        // Get all students topic progress
        [HttpPost("get-all-students-topic-progress")]
        public async Task<IActionResult> GetAllStudentsTopicProgress([FromBody] StudentTopicProgress studentTopicProgress)
        {
            var result = await _studentTopicService.GetAllStudentsTopicProgressAsync(studentTopicProgress);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound(new { message = "No student topic progress found" });
        }

        [HttpPost("get-topic-completion")]
        public async Task<IActionResult> GetStudentTopicProgress([FromBody] StudentTopicProgress studentTopicProgress)
        {
            var result = await _studentTopicService.GetALlStudentsTopicCompletionProgressAsync(studentTopicProgress);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound(new { message = "An error occured" });
        }

        // When the student clicks on the topic and then it gets marked as viewed
        [HttpPut("view-topic")]
        public async Task<IActionResult> ViewStudentTopic([FromBody] StudentTopicDto studentTopicDto)
        {
            var result = await _studentTopicService.ViewStudentTopicAsync(studentTopicDto);

            if (result)
            {
                return Ok(new { message = "Student viewed the topic" });
            }

            return BadRequest(new { message = "Failed to view student topic" });
        }

        // When the student completes the topic, it gets marked as completed
        [HttpPut("complete-student-topic")]
        public async Task<IActionResult> CompleteStudentTopic([FromBody] StudentTopicDto studentTopicDto)
        {
            var result = await _studentTopicService.CompleteStudentTopicAsync(studentTopicDto);

            if (result)
            {
                return Ok(new { message = "Student topic completed successfully" });
            }

            return BadRequest(new { message = "Failed to complete student topic" });
        }

        [HttpGet("get-student-topics")]
        public async Task<IActionResult> GetStudentTopicIds([FromQuery] int studentId)
        {
            var result = await _studentTopicService.GetStudentTopicIdsAsync(studentId);

            if (result != null && result.Any())
            {
                return Ok(result);
            }

            return BadRequest(new { message = "Failed to get StudentTopicIds" });
        }
        [HttpGet("get-student-topic-progress")]
        public async Task<IActionResult> GetStudentTopicProgress([FromQuery] int classroomId)
        {
            var result = await _studentTopicService.GetStudentTopicProgressByClassroomIdAsync(classroomId);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound(new { message = "No progress found for this student and topic" });
        }
    }
}