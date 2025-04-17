using backend.DTOs.Student;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IPendingStudentRepository
    {
        Task<JoinClassroomResultDto> JoinClassroomAsync(PendingStudents pendingStudents);
    }
}