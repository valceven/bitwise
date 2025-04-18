using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs.Student;
using backend.DTOs.Teacher;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Sprache;

namespace backend.Repositories
{
    public class PendingStudentRepository : IPendingStudentRepository
    {
        private readonly bitwiseDbContext _context;

        public PendingStudentRepository(bitwiseDbContext context)
        {
            _context = context;
        }

        public async Task<JoinClassroomResultDto> JoinClassroomAsync(PendingStudents pendingStudents)
        {
            try
            {
                var classroom = await _context.Classrooms
                    .FirstOrDefaultAsync(c => c.ClassCode == pendingStudents.ClassCode);

                if (classroom == null)
                {
                    return new JoinClassroomResultDto
                    {
                        Success = false,
                        Message = $"Classroom with code '{pendingStudents.ClassCode}' not found."
                    };
                }

                var exists = await _context.PendingStudents
                    .FirstOrDefaultAsync(p =>
                        p.StudentId == pendingStudents.StudentId &&
                        p.ClassroomId == classroom.ClassroomID);

                if (exists != null)
                {
                    return new JoinClassroomResultDto
                    {
                        Success = false,
                        Message = "You have already requested to join this classroom."
                    };
                }


                pendingStudents.ClassroomId = classroom.ClassroomID;

                await _context.PendingStudents.AddAsync(pendingStudents);
                await _context.SaveChangesAsync();

                return new JoinClassroomResultDto
                {
                    Success = true,
                    Message = "Successfully requested to join classroom."
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error joining classroom: {ex.Message}");

                return new JoinClassroomResultDto
                {
                    Success = false,
                    Message = "An unexpected error occurred while joining the classroom."
                };
            }
        }

        public async Task<List<(Classroom classroom, List<PendingStudents> pending)>> FetchPendingStudentsGroupedByClassroomAsync(int teacherId)
        {
            var classrooms = await _context.Classrooms
                .Where(c => c.TeacherId == teacherId)
                .ToListAsync();

            var result = new List<(Classroom, List<PendingStudents>)>();

            foreach (var classroom in classrooms)
            {
                var pendingStudents = await _context.PendingStudents
                    .Where(p => p.ClassroomId == classroom.ClassroomID)
                    .Include(p => p.Student)
                        .ThenInclude(s => s.User)
                    .ToListAsync();

                result.Add((classroom, pendingStudents));
            }

            return result;
        }


    }
}