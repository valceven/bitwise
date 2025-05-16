
using backend.DTOs.StudentLesson;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IStudentLessonService
    {
        Task<ICollection<StudentTopic>> GetAllStudentLessonByClassroomIdAsync();
        Task<bool> ViewStudentTopicAsync(ViewStudentLessonDto viewStudentTopic);
        Task<bool> CompleteStudentTopicAsync(CompleteLessonProgressByTopicDto completeStudent);
    }
}