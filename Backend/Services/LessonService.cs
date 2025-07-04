using backend.DTOs.Classroom;
using backend.DTOs.StudentLesson;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;

        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public async Task<Lesson> CreateLessonAsync(CreateLessonDto lessonDto)
        {
            var lesson = new Lesson
            {
                Title = lessonDto.Title,
                Description = lessonDto.Description,
                Order = lessonDto.Order,    
            };

            return await _lessonRepository.CreateLessonAsync(lesson);
        }

        public async Task<Lesson?> GetLessonByIdAsync(int lessonId)
        {
            return await _lessonRepository.GetLessonByIdAsync(lessonId);
        }

        public async Task<bool> UpdateLessonAsync(UpdateLessonDto updatedLessonDto)
        {
            var existingLesson = await _lessonRepository.GetLessonByIdAsync(updatedLessonDto.LessonId);
            if (existingLesson == null) return false;
            existingLesson.Title = updatedLessonDto.Title;
            existingLesson.Description = updatedLessonDto.Description;
            return await _lessonRepository.UpdateLessonAsync(existingLesson);
        }

        public async Task<ICollection<StudentLesson>> GetLessonByClassroomIdAsync(int studentId)
        {
            var lessons = await _lessonRepository.GetLessonByClassroomIdAsync(studentId);
            return lessons.ToList();
        }

        public async Task<bool> DeleteLessonAsync(int lessonId)
        {
            return await _lessonRepository.DeleteLessonAsync(lessonId);
        }
    }
}
