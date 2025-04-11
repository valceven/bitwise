using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<Student?> AddAsync(Student student)
        {
            try {
                _context.Students.Add(student);
                await _context.SaveChangesAsync();
                return student;
            } catch (Exception ex) {
                Console.WriteLine($"Error creating student: {ex.Message}");
                throw new Exception("An error occurred while creating the student.", ex);
            }

        }

        public async Task<Student?> GetByUserIdAsync(int userId)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.StudentId == userId);
        }
    }

}