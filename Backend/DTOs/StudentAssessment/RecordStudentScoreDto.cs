namespace backend.DTOs.StudentAssessment
{
    public class RecordStudentAssessmentDto
    {
        public int StudentAssessmentId { get; set; }
        public int Score { get; set; }
        public DateTime AnsweredAt { get; set; } = DateTime.UtcNow;
    }
}