using backend.DTOs.Lesson;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    public interface IClassroomRepository
    {
        Task<Classroom> CreateClassroomAsync(Classroom classroom);
        Task<List<Classroom>> GetClassroomAsync(int TeacherID);
        Task<Classroom> ViewClassroomAsync(int classroomId);
        Task<List<ViewLessonFromClassroomDto>> GetLessonsByClassroomIdAsync(int classroomId);
        Task<List<Student>> GetStudentsByClassroomIdAsync(int classroomId);
        Task<bool> LeaveClassroomAsync(int studentId);
        Task<Classroom> GetClassroomByClassCodeAsync(string classCode);
        Task<bool> SubmitLeaveRequestAsync(PendingStudents pendingStudent);
        Task<bool> DeleteClassroomAsync(int classroomId);
        Task<bool> UpdateClassroomAsync(Classroom classroom);
    }
}