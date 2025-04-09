public class UserResponseDto
{
    public int UserID { get; set; }
    public string? Name { get; set; }
    public string Email { get; set; }
    public byte UserType { get; set; }
    public bool IsVerified { get; set; }
    public StudentDto? StudentInfo { get; set; }
    public TeacherDto? TeacherInfo { get; set; }
}