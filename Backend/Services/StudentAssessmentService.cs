using backend.Services.Interfaces;
using backend.Repositories.Interfaces;
using backend.Models;
using backend.DTOs.StudentAssessment;
namespace backend.Services
{
    public class StudentAssessmentService : IStudentAssessmentService
    {
        private readonly IStudentAssessmentRepository _studentAssessmentRepository;

        public StudentAssessmentService(IStudentAssessmentRepository studentAssessmentRepository)
        {
            _studentAssessmentRepository = studentAssessmentRepository;
        }

        public async Task<ICollection<StudentAssessment>> GetAllStudentsAssessmentAsync(int topicId, int classroomId)
        {
            return await _studentAssessmentRepository.GetStudentScoreByAssessmentId(topicId, classroomId);
        }

        public async Task<bool> RecordStudentAssessmentAsync(RecordStudentAssessmentDto addStudentAssessment)
        {
            var studentAssessment = new StudentAssessment
            {
                StudentId = addStudentAssessment.StudentId,
                TopicId = addStudentAssessment.TopicId,
                Score = addStudentAssessment.Score,
            };
            return await _studentAssessmentRepository.AddtudentAssessmentAsync(studentAssessment);
        }

        public async Task<bool> UpdateStudentAssessmentAsync(UpdateStudentScoreDto updateStudentAssessment)
        {
            var studentAssessment = await _studentAssessmentRepository.GetStudentScoreByStudentIdAsync(updateStudentAssessment.StudentId, updateStudentAssessment.ClassroomId);

            studentAssessment.Score = updateStudentAssessment.Score;
            return await _studentAssessmentRepository.UpdateStudentAssessmentAsync(studentAssessment);
        }

        public async Task<bool> DeleteStudentAssessmentAsync(int studentId)
        {
            return await _studentAssessmentRepository.DeleteStudentAssessmentAsync(studentId);
        }
    }
    
}