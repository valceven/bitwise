using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Classroom
{
    public class StudentInClassroomDto
    {
        public int StudentId { get; set; }
        public string StudentIdNumber { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}