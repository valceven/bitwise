using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.StudentClassroom;

namespace backend.Repositories.Interfaces
{
    public interface IStudentClassroomRepository
    {
        Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId);
        Task<StudentProgress> GetStudentProgressByStudentClassroomIdAsync(int studentClassroomId);
        Task<ICollection<StudentScores>> GetStudentScoresByClassroomCodeAsync(string classroomCode);
    }
}