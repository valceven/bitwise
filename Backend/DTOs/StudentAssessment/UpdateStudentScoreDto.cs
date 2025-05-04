namespace backend.DTOs.StudentAssessment
{
    public class UpdateStudentScoreDto
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public int ClassroomId { get; set; }
        public int Score { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}