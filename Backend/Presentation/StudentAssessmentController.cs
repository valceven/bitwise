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

        [HttpGet("get-all-student-assessments")]
        public async Task<IActionResult> GetAllStudentAssessments(int studentId)
        {
            var studentAssessments = await _studentAssessmentService.GetAllStudentAssessmentAsync(studentId);
            if (studentAssessments == null)
            {
                return NotFound(new { message = "No Student Assessment Found" });
            }
            return Ok(studentAssessments);
        }
        [HttpPut("complete-student-assessment")]
        public async Task<IActionResult> CompleteStudentAssessment([FromBody] RecordStudentAssessmentDto recordStudentAssessmentDto)
        {
            var result = await _studentAssessmentService.CompleteStudentAssessment(recordStudentAssessmentDto);
            if (result)
            {
                return Ok(new { message = "Student Assessment Completed Successfully" });
            }
            return BadRequest(new { message = "Unexpected Error Occurred" });
        }
        [HttpPut("view-student-assessment")]
        public async Task<IActionResult> ViewStudentAssessment([FromQuery] int studentAssessmentId)
        {
            var result = await _studentAssessmentService.ViewStudentAssessment(studentAssessmentId);
            if (result)
            {
                return Ok(new { message = "Student Assessment Viewed Successfully" });
            }
            return BadRequest(new { message = "Unexpected Error Occurred" });
        }
        [HttpGet("get-student-assessment-by-assessment-id")]
        public async Task<IActionResult> GetStudentAssessmentByAssessmentId([FromQuery] int AssessmentId)
        {
            var studentAssessments = await _studentAssessmentService.GetStudentAssessmentByAssessmentId(AssessmentId);
            if (studentAssessments == null)
            {
                return NotFound(new { message = "No Student Assessment Found" });
            }
            return Ok(studentAssessments);
        }
        
    }
}