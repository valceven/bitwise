using backend.DTOs.Teacher;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _teacherRepository;
        private readonly IPendingStudentRepository _pendingStudentRepository;
        public TeacherService(
            ITeacherRepository teacherRepository,
            IPendingStudentRepository pendingStudentRepository)
        {
            _teacherRepository = teacherRepository;
            _pendingStudentRepository = pendingStudentRepository;
        }

        public async Task<bool> AcceptStudentAsync(AcceptStudentDto dto)
        {
            return await _teacherRepository.AcceptStudentAsync(dto); 
        }

        public async Task<bool> RejectStudentAsync(AcceptStudentDto dto)
        {
            return await _teacherRepository.RejectStudentAsync(dto);
        }

        public async Task<List<FetchPendingStudentsResponseDto>> FetchPendingStudentsAsync(FetchPendingStudentsDto fetchPendingStudentsDto)
        {
            int teacherId = fetchPendingStudentsDto.TeacherId;

            var groupedData = await _pendingStudentRepository.FetchPendingStudentsGroupedByClassroomAsync(teacherId);

            var response = groupedData.Select(group => new FetchPendingStudentsResponseDto
            {
                ClassName = group.classroom.ClassName,
                ClassCode = group.classroom.ClassCode,
                ClassroomId = group.classroom.ClassroomID,
                PendingStudents = group.pending.Select(p => new PendingStudentDto
                {
                    StudentId = p.Student.User.UserId,
                    Name = p.Student.User.Name,
                    Email = p.Student.User.Email,
                    Request = p.Request
                }).ToList()
            }).ToList();

            return response;
        }

    }
}