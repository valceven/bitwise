using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Student
{
    public class CheckPendingStatusResponseDto
    {
        public string ClassCode { get; set; }
        public string Section { get; set; }
        public string ClassName { get; set; }
        public string TeacherName { get; set; }
        public string Description { get; set; }
        public int PendingId { get; set; }
    }
}