using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class AssessmentRepository : IAssessmentRepository
    {
        private readonly bitwiseDbContext _context;

        public AssessmentRepository(bitwiseDbContext context)
        {
            _context = context;
        }
        public async Task<List<Assessment>> GetAllAssessments()
        {
            return await _context.Assessments.ToListAsync();
        }

        public async Task<Assessment> GetAssessmentById(int assessmentId)
        {
            var assessment = await _context.Assessments
                .FirstOrDefaultAsync(a => a.AssessmentId == assessmentId);

            if (assessment == null)
            {
                throw new KeyNotFoundException($"Assessment with ID {assessmentId} not found.");
            }

            return assessment;
        }
        public async Task<bool> AddAssessment(Assessment assessment)
        {
            _context.Assessments.Add(assessment);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateAssessment(Assessment assessment)
        {
            _context.Assessments.Update(assessment);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteAssessment(int assessmentId)
        {
            var assessment = await GetAssessmentById(assessmentId);
            if (assessment == null) return false;

            _context.Assessments.Remove(assessment);
            return await _context.SaveChangesAsync() > 0;
        }
        
    }
}