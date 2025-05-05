using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace backend.Repositories.Interfaces
{

    public interface IStudentAssessmentRepository
    {
        Task<ICollection<StudentAssessment>> GetAllAssessmentStudents();
        Task<bool> AddtudentAssessmentAsync(StudentAssessment assessmentStudent);
        Task<bool> UpdateStudentAssessmentAsync(StudentAssessment assessmentStudent);
        Task<bool> DeleteStudentAssessmentAsync(int assessmentStudentId);
        Task<StudentAssessment> GetStudentScoreByStudentIdAsync(int studentId, int topicId);
        Task<ICollection<StudentAssessment>> GetStudentScoreByAssessmentId(int topicId, int classroomId);
    }
}