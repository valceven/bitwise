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
            var student = await _context.StudentClassrooms
                .Where(sc => sc.StudentId == studentId && sc.ClassroomId == classroomId)
                .FirstOrDefaultAsync();
            
            if (student != null)
            {
                _context.StudentClassrooms.Remove(student);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }

}