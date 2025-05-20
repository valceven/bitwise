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
        public async Task<IActionResult> GetAllStudentAssessments()
        {
            var studentAssessments = await _studentAssessmentService.GetAllStudentAssessmentAsync();
            if (studentAssessments == null)
            {
                return NotFound(new { message = "No Student Assessment Found" });
            }
            return Ok(studentAssessments);
        }
        [HttpPost("complete-student-assessment")]
        public async Task<IActionResult> CompleteStudentAssessment([FromBody] RecordStudentAssessmentDto recordStudentAssessmentDto)
        {
            var result = await _studentAssessmentService.CompleteStudentAssessment(recordStudentAssessmentDto);
            if (result)
            {
                return Ok(new { message = "Student Assessment Completed Successfully" });
            }
            return BadRequest(new { message = "Unexpected Error Occurred" });
        }
        [HttpPost("view-student-assessment")]
        public async Task<IActionResult> ViewStudentAssessment([FromBody] ViewStudentAssessmentDto viewStudenAssessmentDto)
        {
            var result = await _studentAssessmentService.ViewStudentAssessment(viewStudenAssessmentDto);
            if (result)
            {
                return Ok(new { message = "Student Assessment Viewed Successfully" });
            }
            return BadRequest(new { message = "Unexpected Error Occurred" });
        }
        [HttpGet("get-student-assessment-by-topic-id")]
        public async Task<IActionResult> GetStudentAssessmentByTopicId([FromQuery] int topicId)
        {
            var studentAssessments = await _studentAssessmentService.GetStudentAssessmentByTopicId(topicId);
            if (studentAssessments == null)
            {
                return NotFound(new { message = "No Student Assessment Found" });
            }
            return Ok(studentAssessments);
        }
        
    }
}