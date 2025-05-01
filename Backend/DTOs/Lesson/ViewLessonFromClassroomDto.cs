using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Lesson
{
    public class ViewLessonFromClassroomDto
    {
        public int LessonId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}