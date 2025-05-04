using backend.Models;
namespace backend.Services.Interfaces
{
    public interface ITopicAssessmentService
    {
        Task<ICollection<StudentTopic>> GetAllStudentsTopicAsync();
    }
}