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
                    ClassroomId = classroom.ClassroomID,
                    CreatedAt = classroom.CreatedAt,
                    TeacherID = classroom.TeacherId,
                    ClassCode = classroom.ClassCode,
                    IsArchived = classroom.isArchived,
                    Section = classroom.Section,
                    Description = classroom.Description,
                    Students = studentDtos
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
                ClassCode = classroom.ClassCode,
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

        public async Task<ClassroomResponseDTO> GetClassroomByClassCodeAsync(string classCode)
        {
            var classroom = await _classroomRepository.GetClassroomByClassCodeAsync(classCode);
            var students = await _classroomRepository.GetStudentsByClassroomIdAsync(classroom.ClassroomID);

            var studentDtos = students.Select(s => new StudentInClassroomDto
            {
                StudentId = s.StudentId,
                StudentIdNumber = s.StudentIdNumber,
                Name = s.User.Name,
                Email = s.User.Email
            }).ToList();

            var classroomResponseDto = new ClassroomResponseDTO
            {
                ClassName = classroom.ClassName,
                ClassroomId = classroom.ClassroomID,
                CreatedAt = classroom.CreatedAt,
                TeacherID = classroom.TeacherId,
                ClassCode = classroom.ClassCode,
                Section = classroom.Section,
                Description = classroom.Description,
                Students = studentDtos
            };

            return classroomResponseDto;
        }

        public async Task<bool> SubmitLeaveRequestAsync(ClassroomPendingLeaveDTO classroomPendingLeaveDTO)
        {
            var pendingStudent = new PendingStudents
            {
                StudentId = classroomPendingLeaveDTO.StudentId,
                ClassroomId = classroomPendingLeaveDTO.ClassroomId,
                Request = "Leave Class",
                Date = DateTime.UtcNow
            };

            var result = await _classroomRepository.SubmitLeaveRequestAsync(pendingStudent);

            if (result)
            {
                return true;
            }

            return false;
        }
        public async Task<bool> DeleteClassroomAsync(int classroomId)
        {
            var result = await _classroomRepository.DeleteClassroomAsync(classroomId);
            return result;
        }
        public async Task<bool> ArchiveClassroomAsync(ArchiveClassroomDTO classroomDTO)
        {
            var classroom = await _classroomRepository.ViewClassroomAsync(classroomDTO.ClassroomId);
            
            if (classroom == null)
                return false;

            return await _classroomRepository.ArchiveClassroomAsync(classroom);
        }

        public async Task<bool> UpdateClassroomAsync(UpdateClassroomDTO updateClassroomDTO)
        {
            var result = await _classroomRepository.UpdateClassroomAsync(updateClassroomDTO);

            if (!result)
            {
                throw new Exception("Failed to update classroom.");
            }

            return result;
        }
    }

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