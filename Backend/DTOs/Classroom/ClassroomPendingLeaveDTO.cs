using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Classroom
{
    public class ClassroomPendingLeaveDTO
    {
        public int StudentId { get; set; }
        public int ClassroomId { get; set; }
    }
}