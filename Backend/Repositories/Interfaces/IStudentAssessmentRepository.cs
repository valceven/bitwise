using backend.Models;
namespace backend.Repositories.Interfaces
{

    public interface IStudentAssessmentRepository
    {
        Task<ICollection<StudentAssessment>> GetAllStudentAssessmentsAsync();
        Task<StudentAssessment> GetStudentAssessmentById(int StudentAssessmentId);
        Task<bool> CreateStudentAssessmentAsync(StudentAssessment studentAssessment);
        Task<bool> UpdateStudentAssessmentAsync(StudentAssessment studentAssessment);
        Task<bool> DeleteStudentAssessmentAsync(int StudentAssessmentId);
        Task<StudentAssessment> GetStudentAssessmentsByStudentId(int StudentId);
        Task<ICollection<StudentAssessment>> GetAllStudentAssessmentsByTopicId(int TopicId);
        Task<ICollection<StudentAssessment>> GetStudentAssessmentsByClassroomId(int ClassroomId);
    }
}