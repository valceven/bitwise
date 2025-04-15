using backend.DTOs.Classroom;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IClassroomRepository
    {
        Task<Classroom> CreateClassroomAsync(Classroom classroom);
        Task <Classroom> GetClassroomByIdAsync(string classCode);
        Task<User> GetUserByIdAsync(int StudentId);
        Task SaveAsync();
    }
}