using backend.DTOs.Classroom;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class TopicService : ITopicService
    {
        private readonly ITopicRepository _topicRepository;

        public TopicService(ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
        }

        public async Task<Topic> CreateTopicAsync(CreateTopicDto topicDto)
        {
            var topic = new Topic
            {
                TopicName = topicDto.TopicName,
                LessonId = topicDto.LessonId,
                Order = topicDto.Order,
            };

            return await _topicRepository.CreateTopicAsync(topic);
        }

    

        public async Task<Topic?> GetTopicByIdAsync(int topicId)
        {
            return await _topicRepository.GetTopicByIdAsync(topicId);
        }

        public async Task<List<Topic>> GetTopicsByLessonIdAsync(int lessonId)
        {
            var topics = await _topicRepository.GetTopicsByLessonIdAsync(lessonId);
            return topics.ToList();
        }

        public async Task<bool> UpdateTopicAsync(UpdateTopicDto updateTopicDto)
        {
            var topic = new Topic
            {
                TopicId = updateTopicDto.TopicId,
                TopicName = updateTopicDto.TopicName,
            };

            return await _topicRepository.UpdateTopicAsync(topic);
        }

        public async Task<bool> DeleteTopicAsync(int id)
        {
            return await _topicRepository.DeleteTopicAsync(id);
        }
    }
}
