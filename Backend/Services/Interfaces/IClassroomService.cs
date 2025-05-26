 using backend.DTOs.Classroom;
using backend.Models;
namespace backend.Services.Interfaces
{
    public interface IClassroomService
    {
        Task<Classroom> CreateClassroomAsync(CreateClassroomDTO classroomDTO);
        Task<List<ClassroomResponseDTO>> GetClassroomAsync(int teacherID);
        Task<ClassroomResponseDTO> GetClassroomByClassCodeAsync(string classCode);
        Task<ViewClassroomResponseDto> ViewClassroomAsync(ViewClassroomDto viewClassroomDto);
        Task<bool> LeaveClassroomAsync(int StudentId);
        Task<bool> SubmitLeaveRequestAsync(ClassroomPendingLeaveDTO cp);
        Task<bool> DeleteClassroomAsync(int classroomId);
        Task<bool> ArchiveClassroomAsync(ArchiveClassroomDTO classroomDTO);
        Task<bool> UpdateClassroomAsync(UpdateClassroomDTO updateClassroomDTO);
    }
}