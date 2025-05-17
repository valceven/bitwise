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
            var studentTopic = await _studentTopicRepository.GetStudentTopicByStudentIdAsync(studentTopicDto);

            studentTopic.IsViewed = true;

            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }

        public async Task<bool> CompleteStudentTopicAsync(StudentTopicDto studentTopicDto)
        {
            var studentTopic = await _studentTopicRepository.GetStudentTopicByStudentIdAsync(studentTopicDto);
            if (studentTopic == null)
            {
                return false;
            }
            studentTopic.IsCompleted = true;
            return await _studentTopicRepository.UpdateStudentTopicAsync(studentTopic);
        }

    }
}