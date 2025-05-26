using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.DTOs.StudentTopic;

namespace backend.Services
{
    public class StudentTopicService : IStudentTopicService
    {
        private readonly IStudentTopicRepository _studentTopicRepository;

        public StudentTopicService(IStudentTopicRepository studentTopicRepository)
        {
            _studentTopicRepository = studentTopicRepository;
        }

        public async Task<ICollection<StudentTopic>> GetAllStudentsTopicProgressAsync(StudentTopicProgress studentTopicProgress)
        {
            return await _studentTopicRepository.GetAllStudentTopicProgressdAsync(studentTopicProgress);
        }

        public async Task<bool> ViewStudentTopicAsync(StudentTopicDto studentTopicDto)
        {
            var studentTopic = await _studentTopicRepository.GetStudentTopicAsync(studentTopicDto);

            studentTopic.IsViewed = true;
            studentTopic.ViewedAt = DateTime.UtcNow;

            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }

        public async Task<bool> CompleteStudentTopicAsync(StudentTopicDto studentTopicDto)
        {
            var studentTopic = await _studentTopicRepository.GetStudentTopicAsync(studentTopicDto);
            if (studentTopic == null)
            {
                return false;
            }
            studentTopic.IsCompleted = true;
            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }

        public async Task<float> GetALlStudentsTopicCompletionProgressAsync(StudentTopicProgress studentTopicProgress)
        {
            var result = await _studentTopicRepository.GetAllStudentTopicProgressdAsync(studentTopicProgress);

            result = result.Where(r => r.TopicId == studentTopicProgress.TopicId).ToList();
            if (result == null || !result.Any())
            {
                return 0.0f;
            }

            int totalRecords = result.Count();
            int completedRecords = result.Count(r => r.IsCompleted);
            
            float completionRate = (float)completedRecords / totalRecords * 100;
            
            return (float)Math.Round(completionRate, 0);
        }

        public async Task<List<int>> GetStudentTopicIdsAsync(int StudentId)
        {
            return await _studentTopicRepository.GetStudentTopicIdsAsync(StudentId);
        }
    }
}