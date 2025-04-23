using backend.Models;

namespace backend.Services.Interfaces
{
    public interface ITopicService
    {
        Task<Topic> CreateTopicAsync(CreateTopicDto topicDto);
        
        Task<Topic?> GetTopicByIdAsync(int topic);
        Task<List<Topic>> GetTopicsByLessonIdAsync(int lessonId);
        Task<bool> UpdateTopicAsync(UpdateTopicDto updateTopicDto);
        Task<bool> DeleteTopicAsync(int id);
    }
}