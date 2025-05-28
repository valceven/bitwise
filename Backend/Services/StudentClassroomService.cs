using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.DTOs.StudentClassroom;

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
        public async Task<StudentProgress> GetStudentProgressByClassroomIdAsync(int studentClassroomId)
        {
            var result = await _studentClassroomRepository.GetStudentProgressByStudentClassroomIdAsync(studentClassroomId);
            if (result == null)
            {
                throw new Exception("Error. Cannot find student progress");
            }
            return result;
        }
        public async Task<ICollection<StudentScores>> GetStudentScoresByClassroomCodeAsync(string classroomCode)
        {
            var result = await _studentClassroomRepository.GetStudentScoresByClassroomCodeAsync(classroomCode);
            if (result == null || !result.Any())
            {
                throw new Exception("Error. Cannot find student scores for this classroom");
            }
            return result;
        }
        public async Task<ICollection<LeaderBoardsEntryDto>> GetLeaderBoardsByClassroomCodeAsync(string classroomCode)
        {
            var result = await _studentClassroomRepository.GetStudentClassroomByClassCode(classroomCode);

            var leaderBoards = result
                .OrderByDescending(sa => sa.TotalScore)
                .Take(10)
                .Select((sa, index) => new LeaderBoardsEntryDto
                {
                    Rank = index + 1,
                    StudentName = sa.Student.User.Name,
                    TotalScore = sa.TotalScore,
                })
                .ToList();
            
            return leaderBoards;
        }
    }
}