using backend.Data;
using backend.Models;
using backend.DTOs.StudentTopic;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using backend.DTOs.StudentLesson;

namespace backend.Repositories
{
    public class StudentTopicRepository : IStudentTopicRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentTopicRepository(bitwiseDbContext context)
        {
            _context = context;
        }


        public async Task<StudentTopic> GetStudentTopicAsync(StudentTopicDto studentTopicDto)
        {
            var studentTopic = await _context.StudentTopics
                .Include(st => st.Topic)
                .Include(st => st.StudentClassroom)
                .FirstOrDefaultAsync(st => st.StudentClassroom.StudentId == studentTopicDto.StudentId && st.Topic.TopicId == studentTopicDto.TopicId);

            return studentTopic;
        }

        public async Task<bool> AddStudentTopicAsync(StudentTopic studentTopic)
        {
            await _context.StudentTopics.AddAsync(studentTopic);
            return await SaveChangesAsync();
        }

        public async Task<bool> UpdateStudentTopicAsync(StudentTopic studentTopic)
        {
            _context.StudentTopics.Update(studentTopic);
            return await SaveChangesAsync();
        }

        public async Task<bool> DeleteStudentTopicAsync(int studentTopicId)
        {
            var studentTopic = await _context.StudentTopics.FindAsync(studentTopicId);
            if (studentTopic == null)
            {
                return false;
            }
            _context.StudentTopics.Remove(studentTopic);
            return await SaveChangesAsync();
        }
        public async Task<ICollection<StudentTopic>> GetAllStudentTopicProgressdAsync(StudentTopicProgress studentTopicProgress)
        {
            var studentTopics = await _context.StudentTopics
                .Where(st => st.StudentClassroom.ClassroomId == studentTopicProgress.ClassroomId)
                .ToListAsync();

            return studentTopics;
        }
        
        private async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<int>> GetStudentTopicIdsAsync(int StudentId)
        {
            return await _context.StudentTopics
                .Where(st => st.StudentClassroom.StudentId == StudentId)
                .Select(st => st.StudentTopicId)
                .ToListAsync();
        }
    }
}