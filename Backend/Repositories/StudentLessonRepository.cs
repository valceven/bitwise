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

        public async Task<ICollection<StudentLesson>> GetAllStudentLessonProgressAsync(ViewStudentLessonDto viewStudentLesson)
        {
            var studentLessons = await _context.StudentLessons
            .Where(st => st.LessonId == viewStudentLesson.LessonId && 
                        _context.StudentClassrooms
                            .Any(sc => sc.ClassroomId == viewStudentLesson.ClassroomId && 
                                        sc.StudentId == st.StudentId))
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
        public async Task<ICollection<StudentLesson>> GetStudentLessonByLessonIdAsync(int lessonId)
        {
            var studentLessons = await _context.StudentLessons
                .Where(sl => sl.LessonId == lessonId)
                .ToListAsync();
            if (studentLessons == null || !studentLessons.Any())
            {
                throw new KeyNotFoundException($"No StudentLessons found for Lesson ID {lessonId}.");
            }
            return studentLessons;
        }
        private async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}