using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Student
{
    public class JoinClassroomDto
    {
        public int StudentId { get; set; }
        public int UserType { get; set; }
        public string ClassCode { get; set; }
    }
}