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
                var pending = await _context.PendingStudents
                    .FirstOrDefaultAsync(p => p.StudentId == dto.StudentId && p.ClassroomId == dto.ClassroomId);

                if (pending == null) return false;

                _context.PendingStudents.Remove(pending);

                var exists = await _context.StudentClassrooms
                    .AnyAsync(sc => sc.StudentId == dto.StudentId && sc.ClassroomId == dto.ClassroomId);

                if (exists) return false;

                var studentClassroom = new StudentClassroom
                {
                    StudentId = dto.StudentId,
                    ClassroomId = dto.ClassroomId,
                    ClassCode = dto.ClassCode
                };

                _context.StudentClassrooms.Add(studentClassroom);
                await _context.SaveChangesAsync(); // Needed to generate StudentClassroomId

                for (int i = 1; i <= 4; i++)
                {
                    _context.StudentLessons.Add(new StudentLesson
                    {
                        StudentClassroomId = studentClassroom.StudentClassroomId,
                        LessonId = i,
                        IsCompleted = false,
                        IsViewed = false,
                        ViewedAt = DateTime.MinValue,
                        CompletedAt = DateTime.MinValue
                    });
                    await _context.SaveChangesAsync();
                }

                for (int i = 1; i <= 9; i++)
                {
                    _context.StudentTopics.Add(new StudentTopic
                    {
                        StudentClassroomId = studentClassroom.StudentClassroomId,
                        TopicId = i,
                        IsCompleted = false,
                        IsViewed = false,
                        ViewedAt = DateTime.MinValue,
                        CompletedAt = DateTime.MinValue
                    });
                    await _context.SaveChangesAsync();
                }

                for (int i = 1; i <= 9; i++)
                {
                    _context.StudentAssessments.Add(new StudentAssessment
                    {
                        StudentClassroomId = studentClassroom.StudentClassroomId,
                        AssessmentId = i,
                        Score = 0,
                        IsCompleted = false,
                        SubmittedAt = DateTime.MinValue,
                        StartTime = DateTime.MinValue
                    });
                    await _context.SaveChangesAsync();
                }

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
            try
            {
                _context.Teachers.Add(teacher);
                await _context.SaveChangesAsync();
                return teacher;
            }
            catch (Exception ex)
            {
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