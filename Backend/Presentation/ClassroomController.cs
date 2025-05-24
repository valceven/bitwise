namespace backend.Controllers
{
    using backend.DTOs.Classroom;
    using backend.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/classroom")]
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

        [HttpGet("classroom-by-classcode")]
        public async Task<ActionResult<ClassroomResponseDTO>> GetClassroomByClassCode([FromQuery] string classCode)
        {
            var classroom = await _classroomService.GetClassroomByClassCodeAsync(classCode);

            if (classroom != null)
            {
                return Ok(classroom);
            }

            return NotFound("Classroom not found.");
        }


        [HttpGet("classroom-view")]
        public async Task<ActionResult<ViewClassroomResponseDto>> ViewClassroom([FromQuery] ViewClassroomDto viewClassroomDto)
        {
            var ClassroomView = await _classroomService.ViewClassroomAsync(viewClassroomDto);

            if (ClassroomView != null)
            {
                return Ok(ClassroomView);
            }

            return BadRequest("Unkown Error");
        }

        [HttpDelete("leave-classroom")]
        public async Task<IActionResult> LeaveClassroom([FromQuery] int studentId)
        {
            var result = await _classroomService.LeaveClassroomAsync(studentId);

            if (result)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("submit-leave-request")]
        public async Task<IActionResult> SubmitLeaveRequest([FromBody] ClassroomPendingLeaveDTO classroomPendingLeaveDTO)
        {
            var result = await _classroomService.SubmitLeaveRequestAsync(classroomPendingLeaveDTO);

            if (result)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpDelete("delete-classroom")]
        public async Task<IActionResult> DeleteClassroom([FromQuery] int classroomId)
        {
            var result = await _classroomService.DeleteClassroomAsync(classroomId);

            if (result)
                return Ok(result);

            return BadRequest("Failed to delete classroom.");
        }
        [HttpPost("archive-classroom")]
        public async Task<IActionResult> ArchiveClassroom([FromBody] ArchiveClassroomDTO classroomDTO)
        {
            if (classroomDTO == null)
            {
                return BadRequest("Invalid data.");
            }

            var result = await _classroomService.ArchiveClassroomAsync(classroomDTO);

            if (result)
                return Ok(result);

            return BadRequest("Failed to archive classroom.");
        }
    }
}