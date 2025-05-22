using backend.DTOs.Classroom;
using backend.DTOs.StudentLesson;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface ILessonRepository
    {
        Task<Lesson> CreateLessonAsync(Lesson lesson);
        Task<Lesson?> GetLessonByIdAsync(int lessonId);
        Task<ICollection<StudentLesson>> GetLessonByClassroomIdAsync(int studentId);
        Task<List<Lesson>> GetAllLessons();
        Task<bool> UpdateLessonAsync(Lesson lesson);
        Task<bool> DeleteLessonAsync(int lessonId);
    }
}