using backend.Models;

public interface IStudentRepository
{
    Task<Student?> AddAsync(Student student);
    Task<Student?> GetByUserIdAsync(int userId);
}