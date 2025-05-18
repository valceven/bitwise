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
    }
}