using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace backend.Repositories
{
    public class TopicAssessmentRepository : ITopicAssessmentRepository
    {
        private readonly bitwiseDbContext _context;

        public TopicAssessmentRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<TopicAssessment>> GetAllTopicAssessmentsAsync()
        {
            return await _context.TopicAssessments.ToListAsync();
        }

        public async Task<TopicAssessment> GetTopicAssessmentByIdAsync(int id)
        {
            var topicAssessment = await _context.TopicAssessments.FindAsync(id);
            if (topicAssessment == null)
            {
                throw new KeyNotFoundException($"TopicAssessment with ID {id} not found.");
            }
            return topicAssessment;
        }

        public async Task<TopicAssessment> CreateTopicAssessmentAsync(TopicAssessment topicAssessment)
        {
            await _context.TopicAssessments.AddAsync(topicAssessment);
            await _context.SaveChangesAsync();
            return topicAssessment;
        }

        public async Task<bool> UpdateTopicAssessmentAsync(TopicAssessment topicAssessment)
        {
            _context.TopicAssessments.Update(topicAssessment);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteTopicAssessmentAsync(int id)
        {
            var topicAssessment = await GetTopicAssessmentByIdAsync(id);
            if (topicAssessment == null) return false;

            _context.TopicAssessments.Remove(topicAssessment);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<TopicAssessment> GetTopicAssessmentsByTopicId(int topicId)
        {
            return await _context.TopicAssessments.FirstOrDefaultAsync(x => x.TopicId == topicId);
        }
    }    
}