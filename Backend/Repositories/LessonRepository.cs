using backend.DTOs.Classroom;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Repositories
{
    public class LessonRepository : ILessonRepository
    {
        private readonly bitwiseDbContext _context;

        public LessonRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<Lesson> CreateLessonAsync(Lesson lesson)
        {
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();
            return lesson;
        }

        public async Task<Lesson?> GetLessonByIdAsync(int lessonId)
        {
            return await _context.Lessons
                .FirstOrDefaultAsync(l => l.LessonId == lessonId);
        }

        public async Task<bool> UpdateLessonAsync(Lesson lesson)
        {
            _context.Lessons.Update(lesson);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteLessonAsync(int lessonId)
        {
            var lesson = await _context.Lessons.FindAsync(lessonId);
            if (lesson == null) return false;

            _context.Lessons.Remove(lesson);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
