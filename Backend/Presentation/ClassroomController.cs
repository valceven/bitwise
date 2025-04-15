namespace backend.Controllers
{
    using backend.DTOs.Classroom;
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
        public async Task<IActionResult> CreateClassroom([FromBody] CreateClassroomDto classroomDto)
        {
            if (classroomDto == null)
            {
                return BadRequest("Invalid data.");
            }

            var classroom = await _classroomService.CreateClassroomAsync(classroomDto); 
            return CreatedAtAction(nameof(CreateClassroom), new { id = classroom.ClassroomID }, classroom);
        }

        [HttpPost("requestToJoinClassroom")]
        public async Task<IActionResult> RequestToJoinClassroom([FromBody] JoinClassroomDto joinClassroomDto)
        {
            if (joinClassroomDto == null)
            {
                return BadRequest("Invalid data.");
            }

            try{
                var result = await _classroomService.RequestToJoinClassroomAsync(joinClassroomDto.StudentId, joinClassroomDto.ClassCode);
                return Ok(result);
            } 
            catch (Exception ex)
            {
                return BadRequest("Unable to join classroom. " + ex.Message);   
            }
            
        }
    }
}