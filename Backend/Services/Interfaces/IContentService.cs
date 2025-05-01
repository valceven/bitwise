using backend.DTOs.Content;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IContentService
    {
        Task<bool> CreateContent(CreateContentDto contentDto);
        Task<bool> UpdateContent(UpdateContentDto contentDto);
        Task<bool> DeleteContent(int contentId);
        Task<List<Content>> GetAllContents();
        Task<Content?> GetContentById(int contentId);
        Task<List<Content>> GetContentsByTopicId(int topicId);
    }
}