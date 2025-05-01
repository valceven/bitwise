using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        private readonly bitwiseDbContext _context;

        public TopicRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<Topic> CreateTopicAsync(Topic topic)
        {
            var lesson = await _context.Lessons.FindAsync(topic.LessonId);
            if (lesson == null)
            {
                throw new ArgumentException("Lesson not found");
            }
            // Add topic to lesson list
            lesson.Topics.Add(topic);
    
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();
            return topic;
        }

        public async Task<Topic?> GetTopicByIdAsync(int topicId)
        {
            return await _context.Topics
                .Include(t => t.LessonId)
                .FirstOrDefaultAsync(t => t.TopicId == topicId);
        }

        public async Task<IEnumerable<Topic>> GetTopicsByLessonIdAsync(int lessonId)
        {
            return await _context.Topics
                .Where(t => t.LessonId == lessonId)
                .ToListAsync();
        }

        public async Task<bool> UpdateTopicAsync(Topic topic)
        {
            _context.Topics.Update(topic);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteTopicAsync(int topicId)
        {
            var topic = await _context.Topics.FindAsync(topicId);
            if (topic == null) return false;

            _context.Topics.Remove(topic);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
