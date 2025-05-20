namespace backend.DTOs.StudentAssessment
{
    public class RecordStudentAssessmentDto
    {
        public int StudentAssessmentId;
        public int Score { get; set; }
        public DateTime AnsweredAt { get; set; }
    }
}