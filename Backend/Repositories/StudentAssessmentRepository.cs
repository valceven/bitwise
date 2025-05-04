using backend.Models;
using backend.Repositories.Interfaces;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StudentAssessmentRepository : IStudentAssessmentRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentAssessmentRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<StudentAssessment>> GetAllAssessmentStudents()
        {
            return await _context.StudentAssessments.ToListAsync();
        }
        public async Task<StudentAssessment> GetStudentScoreById(int assessmentStudentId)
        {
            var assessmentStudent = await _context.StudentAssessments.FindAsync(assessmentStudentId);
            if (assessmentStudent == null)
            {
                throw new KeyNotFoundException($"StudentAssessment with ID {assessmentStudentId} not found.");
            }
            return assessmentStudent;
        }
        public async Task<bool> AddtudentAssessment(StudentAssessment assessmentStudent)
        {
            _context.StudentAssessments.Add(assessmentStudent);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateStudentAssessment(StudentAssessment assessmentStudent)
        {
            _context.StudentAssessments.Update(assessmentStudent);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteStudentAssessment(int assessmentStudentId)
        {
            var assessmentStudent = await _context.StudentAssessments.FindAsync(assessmentStudentId);
            if (assessmentStudent == null)
            {
                return false;
            }
            _context.StudentAssessments.Remove(assessmentStudent);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}