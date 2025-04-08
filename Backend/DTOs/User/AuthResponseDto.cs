namespace backend.DTOs.User
{
    public class AuthResponseDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public UserResponseDto User { get; set; }
    }
}