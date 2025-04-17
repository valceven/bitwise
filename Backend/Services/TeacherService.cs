using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Teacher;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _teacherRepository;
        public TeacherService(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        public async Task<bool> AcceptStudentAsync(AcceptStudentDto dto)
        {
            return await _teacherRepository.AcceptStudentAsync(dto); 
        }

        public async Task<bool> RejectStudentAsync(AcceptStudentDto dto)
        {
            return await _teacherRepository.RejectStudentAsync(dto);
        }
    }
}