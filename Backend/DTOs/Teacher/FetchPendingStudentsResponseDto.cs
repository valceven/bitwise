using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Teacher
{
    public class FetchPendingStudentsResponseDto
    {
        public string ClassName { get; set; }
        public List<PendingStudentDto> PendingStudents { get; set; }
    }
}