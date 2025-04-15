using backend.DTOs.Classroom;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IClassroomRepository
    {
        Task<Classroom> CreateClassroomAsync(Classroom classroom);
        Task<List<Classroom>> GetClassroomAsync(int TeacherID);
    }
}