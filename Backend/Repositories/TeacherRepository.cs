using backend.Data;
using backend.DTOs.Teacher;
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

        public async Task<bool> AcceptStudentAsync(AcceptStudentDto dto)
        {
            try
            {
                // Remove from PendingStudents
                var pending = await _context.PendingStudents
                    .FirstOrDefaultAsync(p => p.StudentId == dto.StudentId && p.ClassroomId == dto.ClassroomId);

                if (pending != null)
                {
                    _context.PendingStudents.Remove(pending);

                    var exists = await _context.StudentClassrooms
                    .AnyAsync(sc => sc.StudentId == dto.StudentId && sc.ClassroomId == dto.ClassroomId);

                    if (!exists)
                    {
                        // Add to StudentClassroom
                        var studentClassroom = new StudentClassroom
                        {
                            StudentId = dto.StudentId,
                            ClassroomId = dto.ClassroomId
                        };
                        _context.StudentClassrooms.Add(studentClassroom);
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }

                // Check if the student is already in the classroom

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error accepting student: {ex.Message}");
                return false;
            }
        }


        public async Task<Teacher?> AddAsync(Teacher teacher)
        {
            try {
                _context.Teachers.Add(teacher);
                await _context.SaveChangesAsync();
                return teacher;
            } catch (Exception ex) {
                Console.WriteLine($"Error creating student: {ex.Message}");
                throw new Exception("An error occurred while creating the teacher.", ex);
            }
        }

        public async Task<Teacher?> GetByUserIdAsync(int userId)
        {
            return await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == userId);
        }

        public async Task<bool> RejectStudentAsync(AcceptStudentDto dto)
        {
            try
            {
                var pending = await _context.PendingStudents
                    .FirstOrDefaultAsync(p => p.StudentId == dto.StudentId && p.ClassroomId == dto.ClassroomId);

                if (pending != null)
                {
                    _context.PendingStudents.Remove(pending);
                    await _context.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error rejecting student: {ex.Message}");
                return false;
            }
        }

    }
}