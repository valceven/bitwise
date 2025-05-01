using backend.DTOs.Classroom;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface ILessonRepository
    {
        Task<Lesson> CreateLessonAsync(Lesson lesson);
        Task<Lesson?> GetLessonByIdAsync(int lessonId);
        Task<List<Lesson>> GetLessonByClassroomIdAsync(int classroomId);
        Task<List<Lesson>> GetAllLessons();
        Task<bool> UpdateLessonAsync(Lesson lesson);
        Task<bool> DeleteLessonAsync(int lessonId);
    }
}