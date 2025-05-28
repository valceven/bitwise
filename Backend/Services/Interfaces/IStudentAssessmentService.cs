using backend.DTOs.StudentAssessment;
using backend.Migrations;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IStudentAssessmentService
    {
        Task<ICollection<int>> GetAllStudentAssessmentAsync(int studentId);
        Task<bool> CompleteStudentAssessment(RecordStudentAssessmentDto recordStudentAssessmentDto);
        Task<bool> ViewStudentAssessment(int studentAssessmentId);
        Task<ICollection<StudentAssessment>> GetStudentAssessmentByAssessmentId(int AssessmentId);
        Task<StudentAssessment> GetStudentAssessmentByStudentId(int StudentId);

    }
}