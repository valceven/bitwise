public class CreateLessonDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int? CreatedById { get; set; }
    public List<CreateTopicDto> Topics { get; set; }
}