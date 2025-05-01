using backend.DTOs.Classroom;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface ILessonService
    {
        Task<Lesson> CreateLessonAsync(CreateLessonDto lessonDto);
        Task<Lesson?> GetLessonByIdAsync(int lessonId);
        Task<bool> UpdateLessonAsync(UpdateLessonDto updatedLessonDto);
        Task<bool> DeleteLessonAsync(int lessonId);
        Task<List<Lesson>> GetLessonByClassroomIdAsync(int classroomId);
    }
}
