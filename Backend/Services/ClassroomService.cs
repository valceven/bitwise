using backend.DTOs.Classroom;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;

        public ClassroomService(IClassroomRepository classroomRepository)
        {
            _classroomRepository = classroomRepository;
        }

        public async Task<Classroom> CreateClassroomAsync(CreateClassroomDTO classroomDTO)
        {
            var classroom = new Classroom
            {
                ClassName = classroomDTO.ClassName,
                TeacherID = classroomDTO.TeacherID
            };

            return await _classroomRepository.CreateClassroomAsync(classroom);
        }
    }

}