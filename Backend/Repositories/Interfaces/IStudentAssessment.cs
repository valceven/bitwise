using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace backend.Repositories.Interfaces
{

    public interface IStudentAssessmentRepository
    {
        Task<ICollection<StudentAssessment>> GetAllAssessmentStudents();
        Task<StudentAssessment> GetStudentScoreById(int assessmentStudentId);
        Task<bool> AddtudentAssessment(StudentAssessment assessmentStudent);
        Task<bool> UpdateStudentAssessment(StudentAssessment assessmentStudent);
        Task<bool> DeleteStudentAssessment(int assessmentStudentId);
    }
}