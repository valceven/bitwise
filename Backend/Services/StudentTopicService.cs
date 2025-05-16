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

        public async Task<ICollection<StudentTopic>> GetAllStudentsTopicProgressAsync()
        {
            return await _studentTopicRepository.GetAllAssessmentStudents();
        }

        public async Task<bool> ViewStudentTopicAsync(ViewStudentTopicDto viewStudentTopic)
        {
            var studentTopic = new StudentTopic
            {
                StudentId = viewStudentTopic.StudentId,
                TopicId = viewStudentTopic.TopicId,
                IsViewed = true

            };
            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }

        public async Task<bool> CompleteStudentTopicAsync(CompleteStudentTopicDto completeStudentTopic)
        {
            var studentTopic = await _studentTopicRepository.GetStudentTopicByStudentIdAsync(completeStudentTopic.StudentId);

            studentTopic.IsCompleted = true;
            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }

    }
}