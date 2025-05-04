using backend.DTOs.StudentTopic;
using backend.Models;
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

        [HttpGet("get-all-students-topic")]
        public async Task<IActionResult> GetAllStudentsTopic()
        {
            var studentsTopics = await _studentTopicService.GetAllStudentsTopicAsync();

            if (studentsTopics != null && studentsTopics.Count > 0)
            {
                return Ok(new { studentsTopics });
            }

            return NotFound(new { message = "No students topics found" });
        }

        // When the student clicks on the topic and then it gets marked as viewed
        [HttpPost("add-student-topic")]
        public async Task<IActionResult> AddStudentTopic([FromBody] AddStudentTopicDto addStudentTopicDto)
        {
            var result = await _studentTopicService.AddStudentTopicAsync(addStudentTopicDto);

            if (result)
            {
                return Ok(new { message = "Student topic added successfully" });
            }

            return BadRequest(new { message = "Failed to add student topic" });
        }

        // When the student completes the topic, it gets marked as completed
        [HttpPost("complete-student-topic")]
        public async Task<IActionResult> CompleteStudentTopic([FromBody] CompleteStudentTopicDto completeStudentTopicDto)
        {
            var result = await _studentTopicService.CompleteStudentTopicAsync(completeStudentTopicDto);

            if (result)
            {
                return Ok(new { message = "Student topic completed successfully" });
            }

            return BadRequest(new { message = "Failed to complete student topic" });
        }
    }
}