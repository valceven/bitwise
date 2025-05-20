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

        public async Task<ICollection<StudentAssessment>> GetAllStudentAssessmentsAsync()
        {
            return await _context.StudentAssessments
                .Include(sa => sa.Student)
                .ToListAsync();
        }
        public async Task<StudentAssessment> GetStudentAssessmentById(int StudentAssessmentId)
        {
            var studentAssessment = await _context.StudentAssessments
                .Include(sa => sa.Student)
                .FirstOrDefaultAsync(sa => sa.StudentAssessmentId == StudentAssessmentId);
            if (studentAssessment == null)
            {
                throw new Exception($"StudentAssessment with ID {StudentAssessmentId} not found.");
            }
            return studentAssessment;
        }
        public async Task<StudentAssessment> CreateStudentAssessmentAsync(StudentAssessment studentAssessment)
        {
            await _context.StudentAssessments.AddAsync(studentAssessment);
            await _context.SaveChangesAsync();
            return studentAssessment;
        }
        public async Task<bool> UpdateStudentAssessmentAsync(StudentAssessment studentAssessment)
        {
            var existingStudentAssessment = await _context.StudentAssessments
                .FirstOrDefaultAsync(sa => sa.StudentAssessmentId == studentAssessment.StudentAssessmentId);
            if (existingStudentAssessment == null)
            {
                throw new Exception($"StudentAssessment with ID {studentAssessment.StudentAssessmentId} not found.");
            }
            existingStudentAssessment.Score = studentAssessment.Score;
            existingStudentAssessment.IsCompleted = studentAssessment.IsCompleted;
            existingStudentAssessment.SubmittedAt = studentAssessment.SubmittedAt;
            await _context.SaveChangesAsync();
            return true;
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
                .Include(sa => sa.Student)
                .FirstOrDefaultAsync(sa => sa.StudentId == studentId);
            if (studentAssessment == null)
            {
                throw new Exception($"StudentAssessment with Student ID {studentId} not found.");
            }
            return studentAssessment;
        }
        public async Task<ICollection<StudentAssessment>> GetAllStudentAssessmentsByTopicId(int topicId)
        {
            return await _context.StudentAssessments
                .Include(sa => sa.Assessment)
                    .ThenInclude(a => a.Topic)
                .Where(sa => sa.Assessment.Topic.TopicId == topicId)
                .ToListAsync();
        }
        public async Task<ICollection<StudentAssessment>> GetStudentAssessmentsByClassroomId(int classroomId)
        {
            var students = await _context.StudentClassrooms
                .Where(sc => sc.ClassroomId == classroomId)
                .Select(sc => sc.StudentId)
                .ToListAsync();
                
            var studentAssessments = await _context.StudentAssessments
                .Include(sa => sa.Student)
                .Where(sa => students.Contains(sa.StudentId))
                .ToListAsync();
            if (studentAssessments == null)
            {
                throw new Exception($"StudentAssessments with Classroom ID {classroomId} not found.");
            }
            return studentAssessments;
        }

    }
}