using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.StudentLesson
{
    public class GetStudentLessonsDto
    {
        public int classroomId { get; set; }
        public int studentId { get; set; }
    }
}