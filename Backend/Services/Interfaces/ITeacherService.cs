using backend.DTOs.Teacher;

namespace backend.Services.Interfaces
{
    public interface ITeacherService
    {
        Task<bool> AcceptStudentAsync(AcceptStudentDto dto);
        Task<bool> RejectStudentAsync(AcceptStudentDto dto);
    }
}