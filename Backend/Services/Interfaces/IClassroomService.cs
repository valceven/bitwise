 using backend.DTOs.Classroom;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IClassroomService
    {
        Task<Classroom> CreateClassroomAsync(CreateClassroomDTO classroomDTO);
        Task<List<ClassroomResponseDTO>> GetClassroomAsync(int teacherID);
    }
}