using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories.Interfaces
{
    public interface IStudentClassroomRepository
    {
        Task<bool> RemoveStudentFromClassroomAsync(int studentId, int classroomId);
    }
}