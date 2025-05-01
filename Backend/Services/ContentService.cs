using backend.DTOs.Content;
using backend.Models;
using backend.Services.Interfaces;
using backend.Repositories.Interfaces;

namespace backend.Services
{
    public class ContentService : IContentService
    {
        private readonly IContentRepository _contentRepository;

        public ContentService(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public async Task<bool> CreateContent(CreateContentDto contentDto)
        {
            var content = new Content
            {
                TopicId = contentDto.TopicId,
                Order = contentDto.Order,
                ContentTitle = contentDto.ContentTitle,
                ContentBody = contentDto.ContentBody
            };

            await _contentRepository.CreateContentAsync(content);
            return true;
        }

        public async Task<bool> UpdateContent(UpdateContentDto contentDto)
        {
               await _contentRepository.UpdateContentAsync(contentDto);
            return true;
        }

        public async Task<bool> DeleteContent(int contentId)
        {
            return await _contentRepository.DeleteContentAsync(contentId);
        }

        public async Task<List<Content>> GetAllContents()
        {
            return (await _contentRepository.GetAllContentAsync()).ToList();
        }

        public async Task<Content?> GetContentById(int contentId)
        {
            return await _contentRepository.GetContentByIdAsync(contentId);
        }

        public async Task<List<Content>> GetContentsByTopicId(int topicId)
        {
            return new List<Content> { await _contentRepository.GetContentByIdAsync(topicId) };
        }
    }
}