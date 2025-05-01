namespace backend.DTOs.Content
{
    public class UpdateContentDto
    {
        public int TopicId { get; set; }
        public int Oder { get; set; } 
        public string ContentTitle { get; set; } = string.Empty;
        public string ContentBody { get; set; } 
    }
}