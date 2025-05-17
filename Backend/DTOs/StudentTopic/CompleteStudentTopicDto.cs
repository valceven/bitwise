namespace backend.DTOs.StudentTopic
{
    public class CompleteStudentTopicDto
    {
        public int ClassroomId { get; set; }
        public int StudentId { get; set; }
        public int TopicId { get; set; }
        public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
    }
}