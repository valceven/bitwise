using backend.DTOs.StudentLesson;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation
{
    [Route("api/student-lesson")]
    [ApiController]
    public class StudentLessonController : ControllerBase
    {
        [HttpPost("get-all-student-lesson")]
        public async Task<IActionResult> GetAllStudentLesson([FromServices] IStudentLessonService studentLessonService, [FromBody] GetStudentLessonProgressDto getStudentLessonProgressDto)
        {
            var result = await studentLessonService.GetAllStudentLessonAsync(getStudentLessonProgressDto);
            return Ok(result);
        }
        [HttpPut("view-student-lesson")]
        public async Task<IActionResult> ViewStudentLesson([FromServices] IStudentLessonService studentLessonService, [FromBody] StudentLessonDto studentLessonDto)
        {
            var result = await studentLessonService.ViewStudentLessonAsync(studentLessonDto);
            return Ok(result);
        }
        [HttpPut("complete-student-lesson")]
        public async Task<IActionResult> CompleteStudentLesson([FromServices] IStudentLessonService studentLessonService, [FromBody] StudentLessonDto studentLessonDto)
        {
            var result = await studentLessonService.CompleteStudentLessonAsync(studentLessonDto);
            return Ok(result);
        }
    }
}