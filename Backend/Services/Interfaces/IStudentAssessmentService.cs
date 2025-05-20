using backend.DTOs.StudentAssessment;
using backend.Migrations;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IStudentAssessmentService
    {
        Task<ICollection<StudentAssessment>> GetAllStudentAssessmentAsync();
        Task<bool> CompleteStudentAssessment(RecordStudentAssessmentDto recordStudentAssessmentDto);
        Task<bool> ViewStudentAssessment(ViewStudentAssessmentDto viewStudenAssessmentDto);
        Task<ICollection<StudentAssessment>> GetStudentAssessmentByTopicId(int TopicId);
        Task<StudentAssessment> GetStudentAssessmentByStudentId(int StudentId);
    }
}