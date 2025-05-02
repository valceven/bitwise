using backend.Data;
using backend.Models;
using backend.DTOs.Content;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ContentRepository : IContentRepository
    {
        private readonly bitwiseDbContext _context;
        public ContentRepository(bitwiseDbContext context)
        {
            _context = context;
        }
         public Task<IEnumerable<Content>> GetAllContentAsync(){
            var contents = _context.Contents.ToList();
            return Task.FromResult<IEnumerable<Content>>(contents);
         }
        public async Task<Content> CreateContentAsync(Content content){
            var topic = await _context.Topics.FindAsync(content.TopicId);
            if (topic == null)
            {
                throw new ArgumentException("Topic not found");
            }
            // Add content to topic list
            topic.Contents.Add(content);
            _context.Contents.Add(content);
            await _context.SaveChangesAsync();
            return content;
        }
        public async Task<Content> GetContentByIdAsync(int id){
            var content = await _context.Contents.FindAsync(id);
            if (content == null)
            {
                throw new Exception("Content not found");
            }
            return content;
        }
        public async Task<Content> UpdateContentAsync(UpdateContentDto updateContentDto){
            var content = await _context.Contents.FindAsync(updateContentDto.TopicId);
            if (content == null)
            {
                throw new Exception("Content not found");
            }
            return content;
        }
        public async Task<bool> DeleteContentAsync(int id){
            var content = await _context.Contents.FindAsync(id);
            if (content == null)
            {
                throw new Exception("Content not found");
            }
            _context.Contents.Remove(content);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<Content>> GetContentsByTopicIdAsync(int topicId)
        {
            var contents = await _context.Contents
                .Where(c => c.TopicId == topicId)
                .ToListAsync();
            return contents;
        }
    }
}