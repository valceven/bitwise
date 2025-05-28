using backend.Models;
using backend.Repositories.Interfaces;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StudentAssessmentRepository : IStudentAssessmentRepository
    {
        public readonly bitwiseDbContext _context;

        public StudentAssessmentRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<int>> GetAllStudentAssessmentsAsync(int studentId)
        {
            return await _context.StudentAssessments
                .Where(st => st.StudentClassroom.StudentId == studentId)
                .Select(st => st.StudentAssessmentId)
                .OrderBy(id => id)
                .ToListAsync();
        }
        public async Task<StudentAssessment> GetStudentAssessmentById(int StudentAssessmentId)
        {
            var studentAssessment = await _context.StudentAssessments.FirstOrDefaultAsync(sa => sa.StudentAssessmentId == StudentAssessmentId);
            if (studentAssessment == null)
            {
                throw new Exception($"StudentAssessment with ID {StudentAssessmentId} not found.");
            }
            return studentAssessment;
        }
        public async Task<bool> CreateStudentAssessmentAsync(StudentAssessment studentAssessment)
        {
            await _context.StudentAssessments.AddAsync(studentAssessment);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> UpdateStudentAssessmentAsync(StudentAssessment studentAssessment)
        {
            _context.StudentAssessments.Update(studentAssessment);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteStudentAssessmentAsync(int StudentAssessmentId)
        {
            var studentAssessment = await _context.StudentAssessments
                .FirstOrDefaultAsync(sa => sa.StudentAssessmentId == StudentAssessmentId);
            if (studentAssessment == null)
            {
                throw new Exception($"StudentAssessment with ID {StudentAssessmentId} not found.");
            }
            _context.StudentAssessments.Remove(studentAssessment);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<StudentAssessment> GetStudentAssessmentsByStudentId(int studentId)
        {
            var studentAssessment = await _context.StudentAssessments
                .Include(sa => sa.StudentClassroom)
                .FirstOrDefaultAsync(sa => sa.StudentClassroom.StudentId == studentId);
            if (studentAssessment == null)
            {
                throw new Exception($"StudentAssessment with Student ID {studentId} not found.");
            }
            return studentAssessment;
        }
        public async Task<ICollection<StudentAssessment>> GetAllStudentAssessmentsByAssessmentId(int AssessmentId)
        {
            var studentAssessments = await _context.StudentAssessments
                .Include(sa => sa.StudentClassroom)
                .Where(sa => sa.AssessmentId == AssessmentId)
                .ToListAsync();
            if (studentAssessments == null)
            {
                throw new Exception($"StudentAssessments with Assessment ID {AssessmentId} not found.");
            }
            return studentAssessments;
        }
        public async Task<ICollection<StudentAssessment>> GetStudentAssessmentsByClassroomId(int classroomId)
        {
            var studentAssessments = await _context.StudentAssessments
                .Include(sa => sa.StudentClassroom)
                .Where(sa => sa.StudentClassroom.ClassroomId == classroomId)
                .ToListAsync();
            if (studentAssessments == null)
            {
                throw new Exception($"StudentAssessments with Classroom ID {classroomId} not found.");
            }
            return studentAssessments;
        } 
        

    }
}