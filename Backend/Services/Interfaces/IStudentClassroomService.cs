using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface IStudentClassroomService
    {
        Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId);
    }
}