
using backend.DTOs.StudentTopic;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IStudentTopicService
    {
        Task<ICollection<StudentTopic>> GetAllStudentsTopicProgressAsync();
        Task<bool> ViewStudentTopicAsync(ViewStudentTopicDto viewStudentTopic);
        Task<bool> CompleteStudentTopicAsync(CompleteStudentTopicDto completeStudentTopic);

    }
}