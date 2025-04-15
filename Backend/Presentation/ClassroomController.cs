namespace backend.Controllers
{
    using backend.DTOs.Classroom;
    using backend.Models;
    using backend.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _classroomService;

        public ClassroomController(IClassroomService classroomService)
        {
            _classroomService = classroomService;
        }

        [HttpPost("createClassroom")]
        public async Task<IActionResult> CreateClassroom([FromBody] CreateClassroomDTO classroomDTO)
        {
            if (classroomDTO == null)
            {
                return BadRequest("Invalid data.");
            }

            var classroom = await _classroomService.CreateClassroomAsync(classroomDTO);
            return CreatedAtAction(nameof(CreateClassroom), new { id = classroom.ClassroomID }, classroom);
        }

        [HttpGet("classroom")]
        public async Task<ActionResult<List<ClassroomResponseDTO>>> GetClassroom(int teacherID)
        {
            var classroom = await _classroomService.GetClassroomAsync(teacherID);

            return Ok(classroom);
        }
    }
}