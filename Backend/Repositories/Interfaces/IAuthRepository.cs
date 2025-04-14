using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<PendingUser> CreatePendingUserAsync(PendingUser pendingUser);
        Task<PendingUser?> GetPendingUserByEmailAsync(string email);
        Task<(bool, string)> UpdatePendingUserAsync(PendingUser pendingUser);
        Task<int> GetPendingUserVerificationCodeAsync(string email);
    }
}