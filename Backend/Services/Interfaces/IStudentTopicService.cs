
using backend.DTOs.StudentTopic;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IStudentTopicService
    {
        Task<ICollection<StudentTopic>> GetAllStudentsTopicProgressAsync(StudentTopicProgress studentTopicProgress);
        Task<bool> ViewStudentTopicAsync(StudentTopicDto studentTopicDto);
        Task<bool> CompleteStudentTopicAsync(StudentTopicDto studentTopicDto);
        Task<float> GetALlStudentsTopicCompletionProgressAsync(StudentTopicProgress studentTopicProgress);
        Task<List<int>> GetStudentTopicIdsAsync(int StudentId);
    }
}