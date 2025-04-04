namespace backend.DTOs.User
{
    public class UserResponseDto
    {
        public int UserID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required int UserType { get; set; }

    }
}