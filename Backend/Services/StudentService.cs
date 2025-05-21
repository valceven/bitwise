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
        private readonly IClassroomRepository _classroomRepository;

        public StudentService(
            IStudentRepository studentRepository,
            IPendingStudentRepository pendingStudentRepository,
            IClassroomRepository classroomRepository)
        {
            _studentRepository = studentRepository;
            _pendingStudentRepository = pendingStudentRepository;
            _classroomRepository = classroomRepository;
        }

        public async Task<CheckPendingStatusResponseDto> CheckPendingStatusAsync(int StudentId)
        {
            var pendingStatus = await _studentRepository.CheckPendingStatusAsync(StudentId);

            if (pendingStatus == null)
                throw new Exception("No pending status for the student");

            var checkPendingStatusResponseDto = new CheckPendingStatusResponseDto
            {
                ClassCode = pendingStatus.ClassCode,
                Section = pendingStatus.Classroom.Section,
                ClassName = pendingStatus.Classroom.ClassName,
                TeacherName = pendingStatus.Classroom.Teacher.User.Name,
                Description = pendingStatus.Classroom.Description,
                PendingId = pendingStatus.PendingId
            };

            return checkPendingStatusResponseDto;
        }

        public async Task<FetchClassroomResponseDto> FetchClassroomAsync(int StudentId)
        {
            var classroom = await _studentRepository.FetchClassroomAsync(StudentId);

            if (classroom == null)
                throw new Exception("Classroom not found for the student.");

            if (classroom.Teacher == null || classroom.Teacher.User == null)
                throw new Exception("Teacher or User information is missing.");

            var fetchClassroomResponseDto = new FetchClassroomResponseDto
            {
                ClassName = classroom.ClassName,
                ClassroomId = classroom.ClassroomID,
                Section = classroom.Section,
                ClassCode = classroom.ClassCode,
                Description = classroom.Description,
                TeacherName = classroom.Teacher.User.Name,
            };

            return fetchClassroomResponseDto;
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
                ClassCode = joinClassroomDto.ClassCode,
                Request = joinClassroomDto.Request
            };

            return await _pendingStudentRepository.JoinClassroomAsync(pendingStudent);
        }

        public async Task<string> RemovePendingStatusAsync(int pendingId)
        {
            var removed = await _pendingStudentRepository.RemovePendingStudentAsync(pendingId);

            return removed ? "Removed Pending Request Successfully" : "An error occurred";
        }

    }
}