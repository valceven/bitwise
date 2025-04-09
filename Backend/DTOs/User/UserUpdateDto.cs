namespace backend.DTOs.User
{
    public class UserUpdateDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? oldPassword { get; set; }
        public string? newPassword { get; set; }
        // public DateTime DateOfBirth { get; set; }
        public string? StudentIdNumber { get; set; }
        public string? TeacherIdNumber { get; set; }
    }
}