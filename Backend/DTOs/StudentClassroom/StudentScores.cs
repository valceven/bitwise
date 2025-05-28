namespace backend.DTOs.StudentClassroom
{
    public class StudentScores
    {
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public ICollection<float> AssessmentScores { get; set; }
    }
}