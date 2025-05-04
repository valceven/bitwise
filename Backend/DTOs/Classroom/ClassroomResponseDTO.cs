using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Classroom
{
    public class ClassroomResponseDTO
    {
        public string ClassName {get; set;}
        public int ClassroomId {get; set;}
        public DateTime CreatedAt {get; set;}
        public int TeacherID {get; set;}
        public string ClassCode {get; set;}
        public string Section {get; set;}
        public string Description {get; set;}
        public List<StudentInClassroomDto> Students {get; set; }
    }
}