public class AssignLessonDto
{
    public int ClassroomId { get; set; }
    public int LessonId { get; set; }
    public bool IsVisibleToStudents { get; set; } = true;
}