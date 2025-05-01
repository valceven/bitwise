using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Presentation
{
    //[Authorize(Roles = "Admin")]
    [Route("api/topic")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicService _topicService;

        public TopicController(ITopicService topicService)
        {
            _topicService = topicService;
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
        [HttpGet("get-topic")]
        public async Task<IActionResult> GetTopic([FromQuery] int topicId)
        {
            var topic = await _topicService.GetTopicByIdAsync(topicId);

            if (topic != null)
            {
                return Ok(new { topic });
            }

            return NotFound(new { message = "Topic not found" });
        }
        [HttpGet("get-topics-by-lesson")]
        public async Task<IActionResult> GetTopicsByLesson([FromQuery] int lessonId)
        {
            var topics = await _topicService.GetTopicsByLessonIdAsync(lessonId);

            if (topics != null && topics.Count > 0)
            {
                return Ok(new { topics });
            }

            return NotFound(new { message = "No topics found for this lesson" });
        }
        [HttpPut("update-topic")]
        public async Task<IActionResult> UpdateTopic([FromBody] UpdateTopicDto updatedTopicDto)
        {
            var result = await _topicService.UpdateTopicAsync(updatedTopicDto);

            if (result)
            {
                return Ok(new { message = "Topic updated successfully" });
            }

            return NotFound(new { message = "Failed to update topic" });
        }
        [HttpDelete("delete-topic")]
        public async Task<IActionResult> DeleteTopic([FromQuery] int topicId)
        {
            var result = await _topicService.DeleteTopicAsync(topicId);

            if (result)
            {
                return Ok(new { message = "Topic deleted successfully" });
            }

            return NotFound(new { message = "Failed to delete topic" });
        }
    }
}