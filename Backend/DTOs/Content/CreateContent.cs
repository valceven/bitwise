namespace backend.DTOs.Content{
    public class CreateContentDto
    {
        public int TopicId { get; set; }
        public string? ContentTitle { get; set; } = string.Empty;
        public string ContentBody { get; set; } 
        public int Order { get; set; }
    }

}