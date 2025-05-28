using backend.DTOs.StudentClassroom;
using backend.Models;
using backend.Presentation;

namespace backend.Repositories.Interfaces
{
    public interface IStudentClassroomRepository
    {
        Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId);
        Task<StudentProgress> GetStudentProgressByStudentClassroomIdAsync(int studentClassroomId);
        Task<ICollection<StudentScores>> GetStudentScoresByClassroomCodeAsync(string classroomCode);
        Task<ICollection<StudentClassroom>> GetStudentClassroomByClassCode(string classroomCode);
    }
}