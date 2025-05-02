using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace backend.Repositories.Interfaces
{

    public interface IAssessmentStudentRepository
    {
        Task<List<StudentAssessmentResult>> GetAllAssessmentStudents();
        Task<StudentAssessmentResult> GetStudentScoreById(int assessmentStudentId);
        Task<bool> AddAssessmentStudent(StudentAssessmentResult assessmentStudent);
        Task<bool> UpdateAssessmentStudent(StudentAssessmentResult assessmentStudent);
        Task<bool> DeleteAssessmentStudent(int assessmentStudentId);
    }
}