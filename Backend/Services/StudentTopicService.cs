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

        public async Task<ICollection<StudentTopic>> GetAllStudentsTopicAsync()
        {
            return await _studentTopicRepository.GetAllAssessmentStudents();
        }

        public async Task<bool> AddStudentTopicAsync(AddStudentTopicDto addStudentTopic)
        {
            var studentTopic = new StudentTopic
            {
                StudentId = addStudentTopic.StudentId,
                TopicId = addStudentTopic.TopicId,
                IsViewed = true

            };
            return await _studentTopicRepository.AddStudentTopicAsync(studentTopic);
        }

        public async Task<bool> CompleteStudentTopicAsync(CompleteStudentTopicDto completeStudentTopic)
        {
            var studentTopic = await _studentTopicRepository.GetStudentTopicByStudentIdAsync(completeStudentTopic.StudentId);

            studentTopic.IsCompleted = true;
            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }
    }
}