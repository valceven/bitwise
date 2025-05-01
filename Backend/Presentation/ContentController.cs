using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using backend.DTOs.Content;

namespace backend.Presentation{
    [Authorize(Roles = "Admin")]
    [Route("api/content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly IContentService _contentService;
        public ContentController(IContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpPost("create-content")]
        public async Task<IActionResult> CreateContent([FromBody] CreateContentDto contentDto)
        {
            var result = await _contentService.CreateContent(contentDto);

            if (result != null)
            {
                return Ok(new { message = "Content created successfully", content = result });
            }

            return BadRequest(new { message = "Failed to create content" });
        }

        [HttpGet("get-content")]
        public async Task<IActionResult> GetContent([FromQuery] int contentId)
        {
            var content = await _contentService.GetContentById(contentId);

            if (content != null)
            {
                return Ok(new { content });
            }

            return NotFound(new { message = "Content not found" });
        }
        [HttpGet("get-contents-by-topic")]
        public async Task<IActionResult> GetContentsByTopicId([FromQuery] int topicId)
        {
            var contents = await _contentService.GetContentsByTopicId(topicId);

            if (contents != null && contents.Count > 0)
            {
                return Ok(new { contents });
            }

            return NotFound(new { message = "No contents found for this topic" });
        }
        [HttpPut("update-content")]
        public async Task<IActionResult> UpdateContent([FromBody] UpdateContentDto updatedContentDto)
        {
            var result = await _contentService.UpdateContent(updatedContentDto);

            if (result)
            {
                return Ok(new { message = "Content updated successfully" });
            }

            return NotFound(new { message = "Failed to update content" });
        }
        [HttpDelete("delete-content")]
        public async Task<IActionResult> DeleteContent([FromQuery] int contentId)
        {
            var result = await _contentService.DeleteContent(contentId);

            if (result)
            {
                return Ok(new { message = "Content deleted successfully" });
            }

            return NotFound(new { message = "Failed to delete content" });
        }
    }
}