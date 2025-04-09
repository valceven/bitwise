using backend.Models;

public interface ITeacherRepository
{
    Task<Teacher?> AddAsync(Teacher teacher);
    Task<Teacher?> GetByUserIdAsync(int userId);
}