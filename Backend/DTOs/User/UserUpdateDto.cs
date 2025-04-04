namespace backend.DTOs.User
{
    public class UserUpdateDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        // public DateTime DateOfBirth { get; set; }
        // public string? StudentIdNumber { get; set; }
        // public string? TeacherIdNumber { get; set; }
    }
}