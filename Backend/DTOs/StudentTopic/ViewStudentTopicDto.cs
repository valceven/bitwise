namespace backend.DTOs.StudentTopic
{
    public class ViewStudentTopicDto
    {
        public int StudentId { get; set; }
        public int TopicId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}