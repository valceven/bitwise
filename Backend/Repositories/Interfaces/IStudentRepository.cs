using backend.Models;

public interface IStudentRepository
{
    Task<Student?> AddAsync(Student student);
    Task<Student?> GetByUserIdAsync(int userId);
    Task<Classroom> FetchClassroomAsync(int StudentId);
    Task<PendingStudents> CheckPendingStatusAsync(int StudentId);
}