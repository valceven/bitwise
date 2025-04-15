
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ClassroomRepository : IClassroomRepository
    {
        private readonly bitwiseDbContext _context;
        public ClassroomRepository(bitwiseDbContext context)
        {
            _context = context;
        }
        public async Task<Classroom> CreateClassroomAsync(Classroom classroom)
        {  
            
            try
            {
                // ensure that the classcode is unique
                while (_context.Classrooms.Any(c => c.ClassCode == classroom.ClassCode))
                {
                    classroom.ClassCode = CodeGenerator.GenerateClassCode();
                }
                _context.Classrooms.Add(classroom);
                await _context.SaveChangesAsync();
                return classroom;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating classroom: {ex.Message}");
                throw new Exception("An error occurred while creating the classroom.", ex);
            }
        }

        public async Task<Classroom?> GetClassroomByIdAsync(string classCode)
        {
            try
            {
                return await _context.Classrooms
                    .Include(c => c.StudentClassrooms)
                    .FirstOrDefaultAsync(c => c.ClassCode == classCode);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting classroom: {ex.Message}");
                throw new Exception("An error occurred while getting the classroom.", ex);
            }
        }
        public async Task<User?> GetUserByIdAsync(int StudentId)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.UserId == StudentId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting user: {ex.Message}");
                throw new Exception("An error occurred while getting the user.", ex);
            }
        }
        public async Task SaveAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving changes: {ex.Message}");
                throw new Exception("An error occurred while saving changes.", ex);
            }
        }

    
        
    }
}