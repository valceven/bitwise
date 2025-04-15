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

        public async Task<Classroom> CreateClassroomAsync(CreateClassroomDto classroomDto)
        {   
            var classroom = new Classroom
            {
                ClassName = classroomDto.ClassName,
                TeacherId = classroomDto.TeacherID,
                ClassCode = CodeGenerator.GenerateClassCode(), // Generate a random class code
            };

            return await _classroomRepository.CreateClassroomAsync(classroom);
        }

        public async Task<string> RequestToJoinClassroomAsync(int studentId, string classCode)
        {
            var classroom = await _classroomRepository.GetClassroomByIdAsync(classCode);
        if (classroom == null)
            return "Classroom not found.";

        var user = await _classroomRepository.GetUserByIdAsync(studentId);
        if (user == null)
            return "Student not found.";

        // Check if already joined or pending
        var alreadyRequested = classroom.StudentClassrooms?
            .FirstOrDefault(sc => sc.StudentId == studentId);

        if (alreadyRequested != null)
        {
            return $"You already {(alreadyRequested.Status == JoinStatus.Pending ? "requested" : "joined")} this classroom.";
        }

        var joinRequest = new StudentClassroom
        {
            StudentId = studentId,
            ClassroomId = classroom.ClassroomID,
            Status = JoinStatus.Pending
        };

        classroom.StudentClassrooms ??= new List<StudentClassroom>();
        classroom.StudentClassrooms.Add(joinRequest);

        await _classroomRepository.SaveAsync();

        return "Join request submitted successfully and is pending approval.";
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