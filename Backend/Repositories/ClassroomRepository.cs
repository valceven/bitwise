
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Data;
using backend.Services;
using backend.DTOs.Classroom;
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

        public async Task<List<Classroom>> GetClassroomAsync(int teacherID)
        {

            try {
                return await _context.Classrooms
                .Where(c => c.TeacherId == teacherID)
                .ToListAsync();
            } catch (Exception ex) {
                Console.WriteLine($"Error fetching classroom: {ex.Message}");
                throw new Exception("An error occured while creating the classroom.", ex);
            }
        }
    }
}