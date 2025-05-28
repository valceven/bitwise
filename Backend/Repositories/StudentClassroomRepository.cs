using backend.Data;
using backend.DTOs.StudentClassroom;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StudentClassroomRepository : IStudentClassroomRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentClassroomRepository(bitwiseDbContext context)
        {
            _context = context;
        }
        public async Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId)
        {

            try
            {
                // Find the student classroom record
                var studentClassroom = await _context.StudentClassrooms
                    .Where(sc => sc.StudentId == studentId && sc.ClassroomId == classroomId)
                    .FirstOrDefaultAsync();

                if (studentClassroom == null)
                {
                    return false; // No student found in this classroom
                }
                _context.StudentClassrooms.Remove(studentClassroom);

                // 4. Remove any pending request for this student and classroom
                var pendingStudent = await _context.PendingStudents
                    .FirstOrDefaultAsync(ps => ps.StudentId == studentId && ps.ClassroomId == classroomId);

                if (pendingStudent != null)
                {
                    _context.PendingStudents.Remove(pendingStudent);
                }

                // Save all changes
                await _context.SaveChangesAsync();


                return true;
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error removing student from classroom: {ex.Message}");
                return false;
            }
        }
        public async Task<StudentProgress> GetStudentProgressByStudentClassroomIdAsync(int studentId)
        {
            try
            {
                // sort each list by id in ascending order
                var completedLessons = await _context.StudentLessons
                    .Where(sl => sl.StudentClassroom.StudentId == studentId && sl.IsCompleted)
                    .Select(sl => sl.LessonId)
                    .OrderBy(id => id)
                    .ToListAsync();

                var completedTopics = await _context.StudentTopics
                    .Where(st => st.StudentClassroom.StudentId == studentId && st.IsCompleted)
                    .Select(st => st.TopicId)
                    .OrderBy(id => id)
                    .ToListAsync();

                var completedAssessments = await _context.StudentAssessments
                    .Where(sa => sa.StudentClassroom.StudentId == studentId && sa.IsCompleted)
                    .Select(sa => sa.AssessmentId)
                    .OrderBy(id => id)
                    .ToListAsync();

                return new StudentProgress
                {
                    CompletedLessons = completedLessons,
                    CompletedTopics = completedTopics,
                    CompletedAssessments = completedAssessments
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching student progress: {ex.Message}");
                throw new Exception("An error occurred while fetching student progress.", ex);
            }
        }
        public async Task<ICollection<StudentScores>> GetStudentScoresByClassroomCodeAsync(string classroomCode)
        {
            try
            {
                var studentClassrooms = await _context.StudentClassrooms
                    .Include(sc => sc.Student)
                        .ThenInclude(s => s.User)
                    .Include(sc => sc.Classroom)
                    .Where(sc => sc.Classroom.ClassCode == classroomCode)
                    .ToListAsync();

                var studentScoresList = new List<StudentScores>();

                foreach (var studentClassroom in studentClassrooms)
                {
                    var studentName = studentClassroom.Student.User.Name;
                    var studentEmail = studentClassroom.Student.User.Email;

                    var assessmentScores = await _context.StudentAssessments
                        .Where(sa => sa.StudentClassroom.StudentId == studentClassroom.StudentId)
                        .OrderBy(sa => sa.AssessmentId)
                        .Select(sa => (float)sa.Score)
                        .ToListAsync();

                    studentScoresList.Add(new StudentScores
                    {
                        StudentName = studentName,
                        StudentEmail = studentEmail,
                        AssessmentScores = assessmentScores
                    });
                }

                return studentScoresList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching student scores: {ex.Message}");
                throw new Exception("An error occurred while fetching student scores.", ex);
            }
        }
        public async Task<ICollection<StudentClassroom>> GetStudentClassroomByClassCode(string classroomCode)
        {
            try
            {
                var studentClassrooms = await _context.StudentClassrooms
                    .Include(sc => sc.Student)
                        .ThenInclude(s => s.User)
                    .Include(sc => sc.Classroom)
                    .Where(sc => sc.Classroom.ClassCode == classroomCode)
                    .ToListAsync();

                return studentClassrooms;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching student classrooms: {ex.Message}");
                throw new Exception("An error occurred while fetching student classrooms.", ex);
            }
        }

    }

}