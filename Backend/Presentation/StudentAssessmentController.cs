using backend.DTOs.StudentAssessment;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace backend.Presentation
{
    [Route("api/student-assessment")]
    [ApiController]
    public class StudentAssessmentController : ControllerBase
    {
        private readonly IStudentAssessmentService _studentAssessmentService;
        public StudentAssessmentController(IStudentAssessmentService studentAssessmentService)
        {
            _studentAssessmentService = studentAssessmentService;
        }

        [HttpGet("GetAllStudentsAssessment")]
        public async Task<IActionResult> GetAllStudentsAssessment(int topicId, int classroomId)
        {
            var students = await _studentAssessmentService.GetAllStudentsAssessmentAsync(topicId, classroomId);
            return Ok(students);
        }

        [HttpPost("RecordStudentAssessment")]
        public async Task<IActionResult> RecordStudentAssessment([FromBody] RecordStudentAssessmentDto addStudentAssessment)
        {
            var result = await _studentAssessmentService.RecordStudentAssessmentAsync(addStudentAssessment);
            return Ok(result);
        }

        [HttpPut("UpdateStudentScore")]
        public async Task<IActionResult> UpdateStudentScore([FromBody] UpdateStudentScoreDto updateStudentScore)
        {
            var result = await _studentAssessmentService.UpdateStudentAssessmentAsync(updateStudentScore);
            return Ok(result);
        }

        [HttpDelete("DeleteStudentAssessment/{studentId}")]
        public async Task<IActionResult> DeleteStudentAssessment(int studentId)
        {
            var result = await _studentAssessmentService.DeleteStudentAssessmentAsync(studentId);
            return Ok(result);
        }
        [HttpPost("GetStudentScoreByStudentId")]
        public async Task<IActionResult> GetStudentScoreByStudentId([FromBody] GetStudentScoreByStudentIdDto getStudentScoreByStudentIdDto)
        {
            var result = await _studentAssessmentService.GetStudentScoreByStudentIdAsync(getStudentScoreByStudentIdDto);
            return Ok(result);
        }
        [HttpGet("GetAllStudentScoresByClassroomId")]
        public async Task<IActionResult> GetAllStudentScoresByClassroomId(int classroomId)
        {
            var result = await _studentAssessmentService.GetAllStudentScoresByClassroomId(classroomId);
            return Ok(result);
        }
        [HttpPost("GetAllStudentScoreByAssessmentId")]
        public async Task<IActionResult> GetAllStudentScoreByAssessmentId([FromBody] GetAllStudentsScoreByAssessmentDto getAllStudentsScoreByAssessmentDto)
        {
            var result = await _studentAssessmentService.GetAllStudentScoreByAssessmentId(getAllStudentsScoreByAssessmentDto);
            return Ok(result);
        }
    }
}