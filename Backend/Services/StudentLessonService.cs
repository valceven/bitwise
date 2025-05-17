using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.DTOs.StudentLesson;

namespace backend.Services
{
    public class StudentLessonService : IStudentLessonService
    {
        private readonly IStudentLessonRepository _studentLessonRepository;

        public StudentLessonService(IStudentLessonRepository studentLessonRepository)
        {
            _studentLessonRepository = studentLessonRepository;
        }

        public async Task<ICollection<StudentLesson>> GetAllStudentLessonAsync(GetStudentLessonProgressDto getStudentLessonProgressDto)
        {
            return await _studentLessonRepository.GetAllStudentLessonProgressAsync(getStudentLessonProgressDto);
        }
        public async Task<bool> ViewStudentLessonAsync(ViewStudentLessonDto viewStudentLesson)
        {
            var studentLesson = new StudentLesson
            {
                StudentId = viewStudentLesson.StudentId,
                LessonId = viewStudentLesson.LessonId,
                IsViewed = true
            };
            return await _studentLessonRepository.UpdateStudentLessonAsync(studentLesson);
        }
        public async Task<bool> CompleteStudentLessonAsync(StudentLessonDto studentLessonDto)
        {
            var studentLesson = await _studentLessonRepository.GetStudentLessonAsync(studentLessonDto);
            if (studentLesson == null)
            {
                return false;
            }
            studentLesson.IsCompleted = true;
            return await _studentLessonRepository.UpdateStudentLessonAsync(studentLesson);
        }
        
        
    }
}