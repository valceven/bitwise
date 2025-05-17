namespace backend.DTOs.StudentLesson
{
    public class ViewStudentLessonDto
    {
        public int ClassroomId { get; set; }
        public int StudentId { get; set; }
        public int LessonId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}