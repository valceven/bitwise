
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

                // Commented since no available lessons in the database all lessons are hardcoded
                // var classroomLessons = _context.Lessons.Select(cl => new ClassroomLesson
                // {
                //     LessonId = cl.LessonId,
                //     ClassroomId = classroom.ClassroomID,
                //     IsVisibleToStudents = true
                // }).ToList();
                // _context.ClassroomLessons.AddRange(classroomLessons);
                // await _context.SaveChangesAsync();

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

        public async Task<bool> LeaveClassroomAsync(int studentId)
        {
            // Use a transaction to ensure all operations succeed or fail together
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Find the student classroom record
                var studentClassroom = await _context.StudentClassrooms
                    .FirstOrDefaultAsync(sc => sc.StudentId == studentId);

                if (studentClassroom == null)
                {
                    return false; // Student not found in this classroom
                }

                _context.StudentClassrooms.Remove(studentClassroom);

                // 4. Remove any pending request for this student and classroom
                var pendingStudent = await _context.PendingStudents
                    .FirstOrDefaultAsync(ps => ps.StudentId == studentId);

                if (pendingStudent != null)
                {
                    _context.PendingStudents.Remove(pendingStudent);
                }

                // Save all changes
                await _context.SaveChangesAsync();

                // Commit the transaction
                await transaction.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error leaving classroom: {ex.Message}");

                // Roll back the transaction on error
                await transaction.RollbackAsync();

                throw new Exception("An error occurred while leaving the classroom.", ex);
            }
        }

        public async Task<Classroom> GetClassroomByClassCodeAsync(string classCode)
        {
            try
            {
                return await _context.Classrooms
                .Where(c => c.ClassCode == classCode)
                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching classroom: {ex.Message}");
                throw new Exception("An error occured while creating the classroom.", ex);
            }
        }

        public async Task<bool> SubmitLeaveRequestAsync(PendingStudents pendingStudents)
        {
            try
            {
                var classroom = await _context.Classrooms
                    .FirstOrDefaultAsync(c => c.ClassroomID == pendingStudents.ClassroomId);

                if (classroom == null)
                {
                    return false;
                }

                var exists = await _context.PendingStudents
                    .FirstOrDefaultAsync(p =>
                        p.StudentId == pendingStudents.StudentId &&
                        p.ClassroomId == classroom.ClassroomID);

                if (exists != null)
                {
                    return false;
                }

                pendingStudents.ClassCode = classroom.ClassCode;

                await _context.PendingStudents.AddAsync(pendingStudents);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error joining classroom: {ex.Message}");
                throw new Exception("An error occured while submitting leave.", ex);
            }
        }
        public async Task<bool> DeleteClassroomAsync(int classroomId)
        {
            try
            {
                var classroom = await _context.Classrooms
                    .FirstOrDefaultAsync(c => c.ClassroomID == classroomId);

                if (classroom == null)
                {
                    return false;
                }

                _context.Classrooms.Remove(classroom);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting classroom: {ex.Message}");
                throw new Exception("An error occurred while deleting the classroom.", ex);
            }
        }
        public async Task<bool> UpdateClassroomAsync(Classroom classroom)
        {
            try
            {
                var existingClassroom = await _context.Classrooms
                    .FirstOrDefaultAsync(c => c.ClassroomID == classroom.ClassroomID);

                if (existingClassroom == null)
                {
                    return false; // Classroom not found
                }
                _context.Classrooms.Update(existingClassroom);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating classroom: {ex.Message}");
                throw new Exception("An error occurred while updating the classroom.", ex);
            }
        }
    }
}