using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly bitwiseDbContext _context;

        public TeacherRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<Teacher?> AddAsync(Teacher teacher)
        {
            try {
                _context.Teachers.Add(teacher);
                await _context.SaveChangesAsync();
                return teacher;
            } catch (Exception ex) {
                Console.WriteLine($"Error creating student: {ex.Message}");
                throw new Exception("An error occurred while creating the student.", ex);
            }
        }

        public async Task<Teacher?> GetByUserIdAsync(int userId)
        {
            return await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == userId);
        }
    }
}