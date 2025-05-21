namespace backend.DTOs.StudentAssessment
{
    public class ViewStudentAssessmentDto
    {
        public int StudentId { get; set; }
        public int AssessmentId { get; set; }
        public DateTime ViewedAt { get; set; } 
    }
}