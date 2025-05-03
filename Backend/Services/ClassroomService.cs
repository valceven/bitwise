using backend.DTOs.Classroom;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;


namespace backend.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;
        private readonly ILessonRepository _lessonRepository;

        public ClassroomService(IClassroomRepository classroomRepository, ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
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
            var classroomResponseDtos = new List<ClassroomResponseDTO>();

            foreach (var classroom in classrooms)
            {
                var students = await _classroomRepository.GetStudentsByClassroomIdAsync(classroom.ClassroomID);

                var studentDtos = students.Select(s => new StudentInClassroomDto
                {
                    StudentId = s.StudentId,
                    StudentIdNumber = s.StudentIdNumber,
                    Name = s.User.Name,
                    Email = s.User.Email
                }).ToList();

                classroomResponseDtos.Add(new ClassroomResponseDTO
                {
                    ClassName = classroom.ClassName,
                    CreatedAt = classroom.CreatedAt,
                    TeacherID = classroom.TeacherId,
                    ClassCode = classroom.ClassCode,
                    Section = classroom.Section,
                    Description = classroom.Description,
                    Students = studentDtos,
                    ClassroomId = classroom.ClassroomID
                });
            }

            return classroomResponseDtos;
        }

       public async Task<ViewClassroomResponseDto> ViewClassroomAsync(ViewClassroomDto viewClassroomDto)
        {
            int classroomId = viewClassroomDto.ClassroomId;

            var classroom = await _classroomRepository.ViewClassroomAsync(classroomId);
            if (classroom == null)
                return null;

            var lessons = await _classroomRepository.GetLessonsByClassroomIdAsync(classroomId);

            var response = new ViewClassroomResponseDto
            {
                ClassroomId = classroom.ClassroomID,
                ClassName = classroom.ClassName,
                TeacherId = classroom.TeacherId,
                Section = classroom.Section,
                Description = classroom.Description,
                Lessons = lessons
            };

            return response;
        }

        public async Task<bool> LeaveClassroomAsync(int studentId)
        {
            var removed = await _classroomRepository.LeaveClassroomAsync(studentId);

            if (removed)
            {
                return true;
            }
            else
            {
                throw new Exception("Failed to remove student from classroom.");
            }
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