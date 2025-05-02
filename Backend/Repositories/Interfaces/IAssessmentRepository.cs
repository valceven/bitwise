using backend.Models;
namespace backend.Repositories.Interfaces
{
    public interface IAssessmentRepository
    {
        Task<List<Assessment>> GetAllAssessments();
        Task<Assessment> GetAssessmentById(int assessmentId);
        Task<bool> AddAssessment(Assessment assessment);
        Task<bool> UpdateAssessment(Assessment assessment);
        Task<bool> DeleteAssessment(int assessmentId); 
    }
}