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
        public async Task<ICollection<StudentAssessment>> GetAllStudentAssessmentAsync()
        {
            return await _studentAssessmentRepository.GetAllStudentAssessmentsAsync();
        }
        public async Task<bool> CompleteStudentAssessment(RecordStudentAssessmentDto recordStudentAssessmentDto)
        {
            var studentAssessment = await _studentAssessmentRepository.GetStudentAssessmentById(recordStudentAssessmentDto.StudentAssessmentId);

            if (studentAssessment.Attempts > 3)
            {
                throw new Exception("Exeeded maximum attempts. Attempts must not exceed 3.");
            }
            if (recordStudentAssessmentDto.Score > studentAssessment.Score)
            {
                studentAssessment.Score = recordStudentAssessmentDto.Score;

            }
            studentAssessment.SubmittedAt = DateTime.UtcNow;
            studentAssessment.IsCompleted = true;
            studentAssessment.StudentClassroom.TotalScore += recordStudentAssessmentDto.Score;
            return await _studentAssessmentRepository.UpdateStudentAssessmentAsync(studentAssessment);

        }

        public async Task<bool> ViewStudentAssessment(int studentAssessmentId)
        {
            var studentAssessment = await _studentAssessmentRepository.GetStudentAssessmentById(studentAssessmentId);
            if (studentAssessment == null)
            {
                throw new Exception($"StudentAssessment with ID {studentAssessmentId} not found.");
            }
            studentAssessment.StartTime = DateTime.UtcNow;
            if (studentAssessment.Attempts < 3)
            {
                studentAssessment.Attempts += 1;
            }
            return await _studentAssessmentRepository.UpdateStudentAssessmentAsync(studentAssessment);
        }

        public async Task<ICollection<StudentAssessment>> GetStudentAssessmentByAssessmentId(int AssessmentId)
        {
            return await _studentAssessmentRepository.GetAllStudentAssessmentsByAssessmentId(AssessmentId);
        }

        public async Task<StudentAssessment> GetStudentAssessmentByStudentId(int StudentId)
        {
            return await _studentAssessmentRepository.GetStudentAssessmentsByStudentId(StudentId);
        }
          
    }  
}