using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class StudentClassroomService : IStudentClassroomService
    {
        private readonly IStudentClassroomRepository _studentClassroomRepository;

        public StudentClassroomService(IStudentClassroomRepository studentClassroomRepository)
        {
            _studentClassroomRepository = studentClassroomRepository;
        }
        public async Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId)
        {
            var result = await _studentClassroomRepository.RemoveStudentFromClassroomAsync(studentId, classroomId);
            if (result)
            {
                return true;
            }
            return false;
        }
    }
}