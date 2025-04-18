using backend.DTOs.Student;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IPendingStudentRepository
    {
        Task<JoinClassroomResultDto> JoinClassroomAsync(PendingStudents pendingStudents);
        Task<List<(Classroom classroom, List<PendingStudents> pending)>> FetchPendingStudentsGroupedByClassroomAsync(int teacherId);
    }
}