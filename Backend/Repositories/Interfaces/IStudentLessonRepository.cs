
using backend.DTOs.StudentLesson;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IStudentLessonRepository
    {
        Task<ICollection<StudentLesson>> GetAllStudentLessonProgressAsync(GetStudentLessonProgressDto getStudentLessonProgressDto);
        Task<StudentLesson> GetStudentLessonAsync(StudentLessonDto studentLessonDto);
        Task<bool> UpdateStudentLessonAsync(StudentLesson studentLesson);
        Task<bool> DeleteStudentLessonAsync(int studentLessonId);
    }
}