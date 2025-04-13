namespace backend.DTOs.User
{
    public class UserRegisterDto
    {   
        public  string Email { get; set; }
        public string Name { get; set; }
        public  string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public byte UserType { get; set; }
        public int VerificationCode { get; set; }
    }
}