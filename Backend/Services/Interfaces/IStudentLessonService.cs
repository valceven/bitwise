
using backend.DTOs.StudentLesson;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IStudentLessonService
    {
        Task<float> GetStudentLessonCompletionRate(GetStudentLessonProgressDto getStudentLessonProgressDto);
        Task<ICollection<StudentLesson>> GetAllStudentLessonAsync(GetStudentLessonProgressDto getStudentLessonProgressDto);
        Task<bool> ViewStudentLessonAsync(StudentLessonDto studentLessonDto);
        Task<bool> CompleteStudentLessonAsync(StudentLessonDto studentLessonDto);
        Task<float>GetStudentLessonCompletionRateByClassroomId(int classroomId);

    }
}