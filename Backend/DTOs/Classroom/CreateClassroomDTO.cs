namespace backend.DTOs.Classroom
{
    public class CreateClassroomDTO
    {   
        public required string Name { get; set; }
        public string ? Description { get; set; }

    }
}