namespace backend.DTOs.Teacher
{
    public class PendingStudentDto
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; } 
        public string Request { get; set; }
    }
}