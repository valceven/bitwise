using backend.DTOs.Student;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IPendingStudentRepository _pendingStudentRepository;

        public StudentService(
            IStudentRepository studentRepository,
            IPendingStudentRepository pendingStudentRepository)
        {
            _studentRepository = studentRepository;
            _pendingStudentRepository = pendingStudentRepository;
        } 
        public async Task<JoinClassroomResultDto> JoinClassroomAsync(JoinClassroomDto joinClassroomDto)
        {
            if (joinClassroomDto.UserType == 2)
            {
                return new JoinClassroomResultDto
                {
                    Success = false,
                    Message = "Teachers cannot join classrooms."
                };
            }

            var pendingStudent = new PendingStudents
            {
                StudentId = joinClassroomDto.StudentId,
                ClassCode = joinClassroomDto.ClassCode
            };

            return await _pendingStudentRepository.JoinClassroomAsync(pendingStudent);
        }

    }
}