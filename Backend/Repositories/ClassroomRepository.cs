
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Data;
using backend.Services;
using backend.DTOs.Classroom;
using Microsoft.EntityFrameworkCore;
using backend.DTOs.Lesson;

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

                var classroomLessons = _context.Lessons.Select(cl => new ClassroomLesson
                {
                    LessonId = cl.LessonId,
                    ClassroomId = classroom.ClassroomID,
                    IsVisibleToStudents = true
                }).ToList();
                _context.ClassroomLessons.AddRange(classroomLessons);
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

            try
            {
                return await _context.Classrooms
                .Where(c => c.TeacherId == teacherID)
                .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching classroom: {ex.Message}");
                throw new Exception("An error occured while creating the classroom.", ex);
            }
        }

        public async Task<Classroom> ViewClassroomAsync(int classroomId)
        {
            try
            {
                // Fetch classroom only (no direct nav to lessons)
                var classroom = await _context.Classrooms
                    .FirstOrDefaultAsync(c => c.ClassroomID == classroomId);

                return classroom;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error Fetching classroom: {ex.Message}");
                throw new Exception("An error occurred while fetching the classroom");
            }
        }

        public async Task<List<ViewLessonFromClassroomDto>> GetLessonsByClassroomIdAsync(int classroomId)
        {
            try
            {
                var lessonDtos = await _context.ClassroomLessons
                    .Where(cl => cl.ClassroomId == classroomId)
                    .Include(cl => cl.Lesson)
                    .Select(cl => new ViewLessonFromClassroomDto
                    {
                        Title = cl.Lesson.Title,
                        Description = cl.Lesson.Description
                    })
                    .ToListAsync();

                return lessonDtos;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error Fetching lessons: {ex.Message}");
                throw new Exception("An error occurred while fetching the lessons");
            }
        }

        public async Task<List<Student>> GetStudentsByClassroomIdAsync(int classroomId)
        {
            return await _context.StudentClassrooms
                .Where(sc => sc.ClassroomId == classroomId)
                .Include(sc => sc.Student)
                    .ThenInclude(s => s.User)
                .Select(sc => sc.Student)
                .ToListAsync();
        }
    }
}