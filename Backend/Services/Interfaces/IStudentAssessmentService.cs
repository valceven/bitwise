using backend.DTOs.StudentAssessment;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IStudentAssessmentService
    {
        Task<ICollection<StudentAssessment>> GetAllStudentsAssessmentAsync(int topicId, int classroomId);
        Task<bool> RecordStudentAssessmentAsync(RecordStudentAssessmentDto addStudentAssessment);
        Task<bool> UpdateStudentAssessmentAsync(UpdateStudentScoreDto updateStudentAssessment);
        Task<bool> DeleteStudentAssessmentAsync(int studentId);
        
    }
}