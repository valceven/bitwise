using backend.DTOs.StudentTopic;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IStudentTopicRepository
    {
        Task<StudentTopic> GetStudentTopicAsync(StudentTopicDto studentTopicDto);
        Task<ICollection<StudentTopic>> GetAllStudentTopicProgressdAsync(StudentTopicProgress studentTopicProgress);
        Task<bool> AddStudentTopicAsync(StudentTopic StudentTopic);
        Task<bool> UpdateStudentTopicAsync(StudentTopic StudentTopic);
        Task<bool> DeleteStudentTopicAsync(int StudentTopicId);
        Task<List<int>> GetStudentTopicIdsAsync(int StudentId);
        Task<ICollection<StudentTopic>> GetAllStudentTopics();
    }
}