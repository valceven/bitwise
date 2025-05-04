using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace backend.Repositories
{
    public class StudentTopicRepository : IStudentTopicRepository
    {
        private readonly bitwiseDbContext _context;

        public StudentTopicRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<StudentTopic>> GetAllAssessmentStudents()
        {
            return await _context.StudentTopics.ToListAsync();
        }

        public async Task<StudentTopic> GetStudentTopicByStudentIdAsync(int studentId)
        {
            var studentTopic = await _context.StudentTopics.FindAsync(studentId);
            if (studentTopic == null)
            {
                throw new KeyNotFoundException($"StudentTopic with ID {studentId} not found.");
            }
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

        private async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}