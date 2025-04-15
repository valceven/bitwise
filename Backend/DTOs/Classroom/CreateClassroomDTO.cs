namespace backend.DTOs.Classroom
{
    public class CreateClassroomDto
    {   
        public required string ClassName { get; set; }
        public required int TeacherID { get; set; }

    }
}