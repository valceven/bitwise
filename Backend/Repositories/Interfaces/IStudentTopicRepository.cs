using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IStudentTopicRepository{
        Task<ICollection<StudentTopic>> GetAllAssessmentStudents();
        Task<StudentTopic> GetStudentTopicByStudentIdAsync(int StudentId);
        Task<bool> AddStudentTopicAsync(StudentTopic StudentTopic);
        Task<bool> UpdateStudentTopicAsync(StudentTopic StudentTopic);
        Task<bool> DeleteStudentTopicAsync(int StudentTopicId);
    }
}