using backend.DTOs.Classroom;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.DTOs;

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
                TeacherId = classroomDTO.TeacherID,
                Section = classroomDTO.Section,
                Description = classroomDTO.Description,
                ClassCode = CodeGenerator.GenerateClassCode(), // Generate a random class code
            };

            return await _classroomRepository.CreateClassroomAsync(classroom);
        }

        public async Task<List<ClassroomResponseDTO>> GetClassroomAsync(int teacherID)
        {
            var classrooms = await _classroomRepository.GetClassroomAsync(teacherID);
            
            var classroomResponseDtos = classrooms.Select(classroom => new ClassroomResponseDTO
            {
                ClassName = classroom.ClassName,
                CreatedAt = classroom.CreatedAt,
                TeacherID = classroom.TeacherId,
                ClassCode = classroom.ClassCode,
                Section = classroom.Section,
                Description = classroom.Description
            }).ToList();

            return classroomResponseDtos;
        }
    }

    // just a little helper class to generate a random class code
    // Not included in the service interface since it's not a core functionality
    public static class CodeGenerator
    {
        public static string GenerateClassCode(int length = 6)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }

}