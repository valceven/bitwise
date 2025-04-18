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

       public async Task<Classroom> FetchClassroomAsync(int StudentId)
        {
            try
            {
                var studentClassroom = await _context.StudentClassrooms
                    .FirstOrDefaultAsync(sc => sc.StudentId == StudentId);

                if (studentClassroom == null)
                    return null;

                var classroom = await _context.Classrooms
                    .FirstOrDefaultAsync(c => c.ClassroomID == studentClassroom.ClassroomId);

                if (classroom == null)
                    return null;
                
                return classroom;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching the classroom.", ex);
            }
        }

        public async Task<Student?> GetByUserIdAsync(int userId)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.StudentId == userId);
        }
    }

}