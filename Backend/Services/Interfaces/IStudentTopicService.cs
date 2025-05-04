
using backend.DTOs.StudentTopic;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IStudentTopicService
    {
        Task<ICollection<StudentTopic>> GetAllStudentsTopicAsync();
        Task<bool> AddStudentTopicAsync(AddStudentTopicDto addStudentTopic);
        Task<bool> CompleteStudentTopicAsync(CompleteStudentTopicDto completeStudentTopic);
    }
}