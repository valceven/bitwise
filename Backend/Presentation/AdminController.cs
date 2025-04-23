using backend.DTOs.Student;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/students")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        private readonly ITopicService _topicService;
        public AdminController(ILessonService lessonService, ITopicService topicService)
        {
            _topicService = topicService;
            _lessonService = lessonService;
        }
        
        [HttpPost("create-lesson")]
        public async Task<IActionResult> CreateLesson([FromBody] CreateLessonDto lessonDto)
        {
            var result = await _lessonService.CreateLessonAsync(lessonDto);

            if (result != null)
            {
                return Ok(new { message = "Lesson created successfully", lesson = result });
            }

            return BadRequest(new { message = "Failed to create lesson" });
        }

        [HttpPost("create-topic")]
        public async Task<IActionResult> CreateTopic([FromBody] CreateTopicDto topicDto)
        {
            var result = await _topicService.CreateTopicAsync(topicDto);

            if (result != null)
            {
                return Ok(new { message = "Topic created successfully", topic = result });
            }

            return BadRequest(new { message = "Failed to create topic" });
        }
       

    }
}