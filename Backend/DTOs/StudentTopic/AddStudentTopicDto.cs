namespace backend.DTOs.StudentTopic
{
    public class AddStudentTopicDto
    {
        public int StudentId { get; set; }
        public int TopicId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}