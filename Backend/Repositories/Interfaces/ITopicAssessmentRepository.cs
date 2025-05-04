using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface ITopicAssessmentRepository
    {
        Task<ICollection<TopicAssessment>> GetAllTopicAssessmentsAsync();
        Task<TopicAssessment> GetTopicAssessmentByIdAsync(int id);
        Task<TopicAssessment> CreateTopicAssessmentAsync(TopicAssessment topicAssessment);
        Task<bool> UpdateTopicAssessmentAsync(TopicAssessment topicAssessment);
        Task<bool> DeleteTopicAssessmentAsync(int id);
        Task<TopicAssessment> GetTopicAssessmentsByTopicId(int studentId);
    }
}