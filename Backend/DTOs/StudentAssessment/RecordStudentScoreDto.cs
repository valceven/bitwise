namespace backend.DTOs.StudentAssessment
{
    public class RecordStudentAssessmentDto
    {
        public int StudentId { get; set; }
        public int ClassroomId { get; set; }
        public int AssessmentId { get; set; }
        public int TopicId { get; set; }
        public int Score { get; set; }
        public DateTime AnsweredAt { get; set; }
    }
}