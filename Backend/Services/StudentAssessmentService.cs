using backend.Services.Interfaces;
using backend.Repositories.Interfaces;
using backend.Models;
using backend.DTOs.StudentAssessment;
namespace backend.Services
{
    public class StudentAssessmentService : IStudentAssessmentService
    {
        private readonly IStudentAssessmentRepository _studentAssessmentRepository;
        public async Task<ICollection<StudentAssessment>> GetAllStudentAssessmentAsync()
        {
            return await _studentAssessmentRepository.GetAllStudentAssessmentsAsync();
        }
        public async Task<bool> CompleteStudentAssessment(RecordStudentAssessmentDto recordStudentAssessmentDto)
        {
            var studentAssessment = await _studentAssessmentRepository.GetStudentAssessmentById(recordStudentAssessmentDto.StudentAssessmentId);

            studentAssessment.Score = recordStudentAssessmentDto.Score;
            studentAssessment.SubmittedAt = DateTime.Now;
            studentAssessment.IsCompleted = true;

            return await _studentAssessmentRepository.UpdateStudentAssessmentAsync(studentAssessment);

        }

        public async Task<bool> ViewStudentAssessment(ViewStudentAssessmentDto viewStudenAssessmentDto)
        {
            var studentAssessment = new StudentAssessment
            {
                StudentId = viewStudenAssessmentDto.StudentId,
                AssessmentId = viewStudenAssessmentDto.AssessmentId
            };

            return await _studentAssessmentRepository.CreateStudentAssessmentAsync(studentAssessment);
        }

        public async Task<ICollection<StudentAssessment>> GetStudentAssessmentByTopicId(int TopicId)
        {
            return await _studentAssessmentRepository.GetAllStudentAssessmentsByTopicId(TopicId);
        }

        public async Task<StudentAssessment> GetStudentAssessmentByStudentId(int StudentId)
        {
            return await _studentAssessmentRepository.GetStudentAssessmentsByStudentId(StudentId);
        }

    }  
}