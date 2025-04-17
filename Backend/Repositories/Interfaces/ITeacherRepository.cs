using backend.DTOs.Teacher;
using backend.Models;

public interface ITeacherRepository
{
    Task<Teacher?> AddAsync(Teacher teacher);
    Task<Teacher?> GetByUserIdAsync(int userId);
    Task<bool> AcceptStudentAsync(AcceptStudentDto dto);
    Task<bool> RejectStudentAsync(AcceptStudentDto dto);
}