using backend.DTOs.Student;

namespace backend.Services.Interfaces
{
    public interface IStudentService
    {
        Task<JoinClassroomResultDto> JoinClassroomAsync(JoinClassroomDto joinClassroomDto);
        Task<FetchClassroomResponseDto> FetchClassroomAsync(int StudentId);
        Task<CheckPendingStatusResponseDto> CheckPendingStatusAsync(int StudentId);
        Task<string> RemovePendingStatusAsync(int PendingId);
    }
}