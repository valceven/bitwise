using backend.Models;
using backend.DTOs.Content;

namespace backend.Repositories.Interfaces
{
    public interface IContentRepository
    {
        Task<IEnumerable<Content>> GetAllContentAsync();
        Task<Content> CreateContentAsync(Content content);
        Task<Content> GetContentByIdAsync(int id);
        Task<Content> UpdateContentAsync(UpdateContentDto updateContentDto);
        Task<bool> DeleteContentAsync(int id);
        Task<IEnumerable<Content>> GetContentsByTopicIdAsync(int topicId);
    }
}