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
        public async Task<bool> ViewStudentLessonAsync(StudentLessonDto studentLessonDto)
        {
            var studentLesson = await _studentLessonRepository.GetStudentLessonAsync(studentLessonDto);
            if (studentLesson == null)
            {
                return false;
            }
            studentLesson.IsViewed = true;
            studentLesson.ViewedAt = DateTime.UtcNow;
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

        public async Task<float> GetStudentLessonCompletionRate(GetStudentLessonProgressDto getStudentLessonProgressDto)
        {
            var result = await _studentLessonRepository.GetAllStudentLessonProgressAsync(getStudentLessonProgressDto);

            // get result where result.LessonId == getStudentLessonProgressDto.LessonId
            result = result.Where(r => r.LessonId == getStudentLessonProgressDto.LessonId).ToList();
            if (!result.Any())
            {
                return 0.0f;
            }

            int totalRecords = result.Count();
            int completedRecords = result.Count(r => r.IsCompleted);

            float completionRate = (float)completedRecords / totalRecords * 100;

            return (float)Math.Round(completionRate, 0);
        }
        public async Task<float> GetStudentLessonCompletionRateByClassroomId(int classroomId)
        {
            var result = await _studentLessonRepository.GetAllStudentLessonProgressAsync(new GetStudentLessonProgressDto { ClassroomId = classroomId });

            if (result == null || !result.Any())
            {
                return 0.0f;
            }

            int totalRecords = result.Count();
            int completedRecords = result.Count(r => r.IsCompleted);

            float completionRate = (float)completedRecords / totalRecords * 100;

            return (float)Math.Round(completionRate, 0);
        }
    }
}