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
        
        public async Task<bool> AddtudentAssessmentAsync(StudentAssessment assessmentStudent)
        {
            
            _context.StudentAssessments.Add(assessmentStudent);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateStudentAssessmentAsync(StudentAssessment assessmentStudent)
        {
            _context.StudentAssessments.Update(assessmentStudent);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteStudentAssessmentAsync(int assessmentStudentId)
        {
            var assessmentStudent = await _context.StudentAssessments.FindAsync(assessmentStudentId);
            if (assessmentStudent == null)
            {
                return false;
            }
            _context.StudentAssessments.Remove(assessmentStudent);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<StudentAssessment> GetStudentScoreByStudentIdAsync(int studentId, int classroomId)
        {
            var studentAssessment = await _context.StudentAssessments
                .Include(sa => sa.Student)
                .FirstOrDefaultAsync(sa => sa.StudentId == studentId && sa.ClassroomId == classroomId);
            if (studentAssessment == null)
            {
                throw new KeyNotFoundException($"No student found with ID {studentId} in Classroom ID {classroomId}.");
            }
            return studentAssessment;
        }
        public async Task<ICollection<StudentAssessment>> GetAllStudentScoresByClassroomId(int classroomId)
        {
            var studentAssessments = await _context.StudentAssessments
                .Include(sa => sa.Student)
                .Where(sa => sa.ClassroomId == classroomId)
                .ToListAsync();
            return studentAssessments;
        }
        public async Task<ICollection<StudentAssessment>> GetAllStudentScoreByAssessmentId(int topicId, int classroomId)
        {
            var studentAssessments = await _context.StudentAssessments
                .Include(sa => sa.Student)
                .Where(sa => sa.TopicId == topicId && sa.ClassroomId == classroomId)
                .ToListAsync();
            return studentAssessments;
        }
    }
}