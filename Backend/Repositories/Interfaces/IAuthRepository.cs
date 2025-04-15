using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<PendingUser> CreatePendingUserAsync(PendingUser pendingUser);
        Task<PendingUser?> GetPendingUserByEmailAsync(string email);
        Task<(bool Success, string Message)> UpdatePendingUserAsync(PendingUser pendingUser);
        Task<int> GetPendingUserVerificationCodeAsync(string email);
    }
}