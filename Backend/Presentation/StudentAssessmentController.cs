using backend.DTOs.StudentAssessment;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace backend.Presentation
{
    public class StudentAssessmentController : ControllerBase
    {
        private readonly IStudentAssessmentService _studentAssessmentService;
        public StudentAssessmentController(IStudentAssessmentService studentAssessmentService)
        {
            _studentAssessmentService = studentAssessmentService;
        }

        [HttpGet("GetAllStudentsAssessment/{topicId}/{classroomId}")]
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
    }
}