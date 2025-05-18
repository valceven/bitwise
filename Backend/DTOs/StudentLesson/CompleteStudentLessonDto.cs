namespace backend.DTOs.StudentLesson
{
    public class CompleteLessonDto
    {
        public int ClassroomId { get; set; }
        public int LessonId { get; set; }
        public int StudentId { get; set; }
        public DateTime CompletedAt { get; set; } 
    }
}