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
            var student = await _context.StudentClassrooms
                .Include(sc => sc.Student)
                .FirstOrDefaultAsync(sc => sc.StudentId == studentId && sc.ClassroomId == classroomId);
            if (student == null)
            {
                throw new KeyNotFoundException($"Student with ID {studentId} not found in Classroom ID {classroomId}.");
            }
            var assessmentStudent = await _context.StudentAssessments
                .FirstOrDefaultAsync(a => a.StudentId == student.StudentId);
            if (assessmentStudent == null)
            {
                throw new KeyNotFoundException($"Assessment for Student ID {studentId} not found.");
            }
            return assessmentStudent;
        }
        public async Task<ICollection<StudentAssessment>> GetStudentScoreByAssessmentId(int topicId, int classroomId)
        {
            // make sure that the students are in the same classroom
            var students = await _context.StudentClassrooms
                .Include(sc => sc.Student)
                .Where(sc => sc.ClassroomId == classroomId)
                .Select(sc => sc.Student)
                .ToListAsync();
            if (students == null || students.Count == 0)
            {
                throw new KeyNotFoundException($"No students found in Classroom ID {classroomId}.");
            }

            var studentAssessments = await _context.StudentAssessments
                .Where(sa => students.Contains(sa.Student))
                .Where(sa => sa.TopicId == topicId)
                .ToListAsync();
            return studentAssessments;
        }
        
    }
}