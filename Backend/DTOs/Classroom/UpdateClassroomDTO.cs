using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Classroom
{
    public class UpdateClassroomDTO
    {
        public int ClassroomId { get; set; }
        public string? ClassName { get; set; }
        public string? Section { get; set; }
        public string? Description { get; set; }
    }
}