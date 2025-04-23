using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Student
{
    public class FetchClassroomResponseDto
    {
        public string ClassName { get; set; }
        public string Section { get; set; }
        public string Description { get; set; }

        // to add here mga deatils like topic etc placeholder rani for now.
    }
}