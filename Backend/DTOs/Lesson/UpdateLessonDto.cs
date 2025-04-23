using backend.Models;

public class UpdateLessonDto
{
    public int LessonId { get; set; }
    public string Title { get; set; }
    public List<Content> Content { get; set; }
}
