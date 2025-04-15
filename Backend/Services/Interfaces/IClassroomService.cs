 using backend.DTOs.Classroom;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IClassroomService
    {
        Task<Classroom> CreateClassroomAsync(CreateClassroomDto classroomDto);
        Task<string> RequestToJoinClassroomAsync(int studentId, string classCode);
    }
}