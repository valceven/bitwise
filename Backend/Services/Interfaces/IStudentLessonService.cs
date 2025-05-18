
using backend.DTOs.StudentLesson;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IStudentLessonService
    {
        Task<ICollection<StudentLesson>> GetAllStudentLessonAsync(GetStudentLessonProgressDto getStudentLessonProgressDto);
        Task<bool> ViewStudentLessonAsync(StudentLessonDto studentLessonDto);
        Task<bool> CompleteStudentLessonAsync(StudentLessonDto studentLessonDto);
    }
}