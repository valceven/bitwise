namespace backend.DTOs.User
{
    public class RefreshTokenDto
    {
        public string RefreshToken { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
