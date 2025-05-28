using backend.DTOs.StudentAssessment;
using backend.DTOs.StudentClassroom;
namespace backend.Services.Interfaces
{
    public interface IStudentClassroomService
    {
        Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId);
        Task<StudentProgress> GetStudentProgressByClassroomIdAsync(int studentClassroomId);
        Task<ICollection<StudentScores>> GetStudentScoresByClassroomCodeAsync(string classroomCode);
        Task<ICollection<LeaderBoardsEntryDto>> GetLeaderBoardsByClassroomCodeAsync(string classroomCode);
    }
}