namespace backend.DTOs.Teacher
{
    public class FetchPendingStudentsResponseDto
    {
        public string ClassName { get; set; }
        public string ClassCode { get; set; }
        public int ClassroomId { get; set; }
        public List<PendingStudentDto> PendingStudents { get; set; }
    }
}