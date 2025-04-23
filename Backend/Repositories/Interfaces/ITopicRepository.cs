using backend.Models;
public interface ITopicRepository
{
    Task<Topic> CreateTopicAsync(Topic topic);
    Task<Topic?> GetTopicByIdAsync(int topicId);
    Task<IEnumerable<Topic>> GetTopicsByLessonIdAsync(int lessonId); 
    Task<bool> UpdateTopicAsync(Topic topic);
    Task<bool> DeleteTopicAsync(int topicId);
}