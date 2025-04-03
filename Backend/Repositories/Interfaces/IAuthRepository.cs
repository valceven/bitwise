using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> CreateUserAsync(User user);
        Task<User> LoginUserAsync (User user);
    }
}