using backend.Models;
namespace backend.Repositories.Interfaces
{
    public interface ILeaderboardRepository{
        Task<ICollection<Leaderboard>> GetLeaderboads();
        Task<bool> AddStudentToLeaderboadAsync(Leaderboard leaderboard);
        Task<bool> UpdateLeaderboardAsync(Leaderboard leaderboard);
        Task<bool> DeleteLeaderboardAsync(int assessmentStudentId);
        Task<ICollection<Leaderboard>> GetLeaderboardByClassroomIdAsync(int studentId, int topicId);
        Task<ICollection<Leaderboard>> GetLeaderboardBy(int assessmentId, int classroomId);
    }
}