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

        public async Task<PendingStudents?> CheckPendingStatusAsync(int StudentId)
        {
            try {
                return await _context.PendingStudents
                .Include(ps => ps.Classroom)
                    .ThenInclude(c => c.Teacher)
                        .ThenInclude(t => t.User)
                .FirstOrDefaultAsync(sc => sc.StudentId == StudentId);
            } catch (Exception ex) {
                Console.Write($"Error Finding Pending Student: {ex.Message}");
                throw new Exception("An error occurred while fetching pending student.", ex);
            }
        }

        public async Task<Classroom?> FetchClassroomAsync(int studentId)
        {
            var studentClassroom = await _context.StudentClassrooms
                .Include(sc => sc.Classroom)
                    .ThenInclude(c => c.Teacher)
                        .ThenInclude(t => t.User)
                .FirstOrDefaultAsync(sc => sc.StudentId == studentId);

            return studentClassroom?.Classroom;
        }
        public async Task<Student?> GetByUserIdAsync(int userId)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.StudentId == userId);
        }
    }

}