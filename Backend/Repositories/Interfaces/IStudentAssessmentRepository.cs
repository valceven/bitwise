using backend.DTOs.StudentAssessment;
using backend.Models;
namespace backend.Repositories.Interfaces
{

    public interface IStudentAssessmentRepository
    {
        Task<ICollection<RoadmapStudentAssessmentDto>> GetAllStudentAssessmentsAsync(int studentId);
        Task<StudentAssessment> GetStudentAssessmentById(int StudentAssessmentId);
        Task<bool> CreateStudentAssessmentAsync(StudentAssessment studentAssessment);
        Task<bool> UpdateStudentAssessmentAsync(StudentAssessment studentAssessment);
        Task<bool> DeleteStudentAssessmentAsync(int StudentAssessmentId);
        Task<StudentAssessment> GetStudentAssessmentsByStudentId(int StudentId);
        Task<ICollection<StudentAssessment>> GetAllStudentAssessmentsByAssessmentId(int StudentAssessmentId);
        Task<ICollection<StudentAssessment>> GetStudentAssessmentsByClassroomCode(string ClassroomCode);
    }
}