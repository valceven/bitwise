namespace backend.DTOs.StudentAssessment
{
    public class UpdateStudentScoreDto
    {
        public int StudentId { get; set; }
        public int TopicId { get; set; }
        public int ClassroomId { get; set; }
        public int Score { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}