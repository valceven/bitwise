using backend.Data;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StudentClassroomRepository : IStudentClassroomRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentClassroomRepository(bitwiseDbContext context)
        {
            _context = context;
        }
        public async Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId)
        {
            // Use a transaction to ensure all operations succeed or fail together
            using var transaction = await _context.Database.BeginTransactionAsync();
            
            try
            {
                // Find the student classroom record
                var studentClassroom = await _context.StudentClassrooms
                    .Where(sc => sc.StudentId == studentId && sc.ClassroomId == classroomId)
                    .FirstOrDefaultAsync();
                
                if (studentClassroom == null)
                {
                    return false; // No student found in this classroom
                }
                
                // 1. Remove from StudentLessons
                var studentLessons = await _context.StudentLessons
                    .Where(sl => sl.StudentId == studentId)
                    .ToListAsync();
                    
                if (studentLessons.Any())
                {
                    _context.StudentLessons.RemoveRange(studentLessons);
                }
                
                // 2. Remove from StudentTopics
                var studentTopics = await _context.StudentTopics
                    .Where(st => st.StudentId == studentId)
                    .ToListAsync();
                    
                if (studentTopics.Any())
                {
                    _context.StudentTopics.RemoveRange(studentTopics);
                }
                
                // 3. Remove from StudentClassrooms
                _context.StudentClassrooms.Remove(studentClassroom);
                
                // 4. Remove any pending request for this student and classroom
                var pendingStudent = await _context.PendingStudents
                    .FirstOrDefaultAsync(ps => ps.StudentId == studentId && ps.ClassroomId == classroomId);
                    
                if (pendingStudent != null)
                {
                    _context.PendingStudents.Remove(pendingStudent);
                }
                
                // Save all changes
                await _context.SaveChangesAsync();
                
                // Commit the transaction
                await transaction.CommitAsync();
                
                return true;
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error removing student from classroom: {ex.Message}");
                
                // Roll back the transaction on error
                await transaction.RollbackAsync();
                
                return false;
            }
        }
    }

}