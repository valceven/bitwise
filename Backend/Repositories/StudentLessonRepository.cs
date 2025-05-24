using backend.Data;
using backend.DTOs.StudentLesson;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace backend.Repositories
{
    public class StudentLessonRepository : IStudentLessonRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentLessonRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<StudentLesson>> GetAllStudentLessonProgressAsync(GetStudentLessonProgressDto getStudentLessonProgressDto)
        {
            var studentLessons = await _context.StudentLessons
                .Include(sl => sl.Lesson)
                .Where(sl => sl.StudentClassroom.ClassroomId == getStudentLessonProgressDto.ClassroomId)
                .ToListAsync();

            return studentLessons;
        }
        
        public async Task<bool> UpdateStudentLessonAsync(StudentLesson studentLesson)
        {
            _context.StudentLessons.Update(studentLesson);
            return await SaveChangesAsync();
        }
        public async Task<bool> DeleteStudentLessonAsync(int studentLessonId)
        {
            var studentLesson = await _context.StudentLessons.FindAsync(studentLessonId);
            if (studentLesson == null)
            {
                return false;
            }
            _context.StudentLessons.Remove(studentLesson);
            return await SaveChangesAsync();
        }
        public async Task<StudentLesson> GetStudentLessonAsync(StudentLessonDto studentLessonDto)
        {
            var studentLesson = await _context.StudentLessons
                .Include(sl => sl.Lesson)
                .Include(sl => sl.StudentClassroom)
                .FirstOrDefaultAsync(sl => sl.StudentClassroom.StudentId == studentLessonDto.StudentId && sl.Lesson.LessonId == studentLessonDto.LessonId);

            return studentLesson;
        }
        private async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}