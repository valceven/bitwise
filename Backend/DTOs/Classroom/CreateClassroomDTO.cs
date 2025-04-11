namespace backend.DTOs.Classroom
{
    public class CreateClassroomDTO
    {   
        public required string ClassName { get; set; }

        public required int TeacherID { get; set; }

    }
}