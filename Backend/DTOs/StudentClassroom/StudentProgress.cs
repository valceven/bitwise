namespace backend.DTOs.StudentClassroom
{
    public class StudentProgress
    {
        public ICollection<int> CompletedLessons { get; set; }
        public ICollection<int> CompletedTopics { get; set; }
        public ICollection<int> CompletedAssessments { get; set; }
    }
}