using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Teacher
{
    public class AcceptStudentDto
    {
        public bool Status { get; set; }
        public int StudentId { get; set; }
        public int ClassroomId { get; set; }
        public string ClassCode { get; set; }
    }
}