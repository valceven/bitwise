
using backend.DTOs.StudentLesson;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IStudentLessonRepository
    {
        Task<ICollection<StudentLesson>> GetAllStudentLessonProgressAsync(ViewStudentLessonDto viewStudentLesson);
        Task<ICollection<StudentLesson>> GetStudentLessonByLessonIdAsync(int lessonId);
        Task<bool> UpdateStudentLessonAsync(StudentLesson studentLesson);
        Task<bool> DeleteStudentLessonAsync(int studentLessonId);
    }
}