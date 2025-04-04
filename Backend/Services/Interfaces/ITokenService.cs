using backend.Models;

namespace backend.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}