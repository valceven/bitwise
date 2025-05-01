using backend.DTOs.Lesson;

using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
namespace backend.Presentation
{
    [Authorize(Roles = "Admin")]
    [Route("api/lessons")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        public LessonController(ILessonService lessonService)
        {
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

        [HttpGet("get-lesson")]
        public async Task<IActionResult> GetLesson([FromQuery] int lessonId)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(lessonId);

            if (lesson != null)
            {
                return Ok(new { lesson });
            }

            return NotFound(new { message = "Lesson not found" });
        }
        [HttpGet("get-lessons-by-classroom")]
        public async Task<IActionResult> GetLessonsByClassroomId([FromQuery] int classroomId)
        {
            var lessons = await _lessonService.GetLessonByClassroomIdAsync(classroomId);

            if (lessons != null && lessons.Count > 0)
            {
                return Ok(new { lessons });
            }

            return NotFound(new { message = "No lessons found for this classroom" });
        }

        [HttpPut("update-lesson")]
        public async Task<IActionResult> UpdateLesson([FromBody] UpdateLessonDto updatedLessonDto)
        {
            var result = await _lessonService.UpdateLessonAsync(updatedLessonDto);

            if (result)
            {
                return Ok(new { message = "Lesson updated successfully" });
            }

            return NotFound(new { message = "Failed to update lesson" });
        }
        [HttpDelete("delete-lesson")]
        public async Task<IActionResult> DeleteLesson([FromQuery] int lessonId)
        {
            var result = await _lessonService.DeleteLessonAsync(lessonId);

            if (result)
            {
                return Ok(new { message = "Lesson deleted successfully" });
            }

            return NotFound(new { message = "Failed to delete lesson" });
        }
    }
}