using backend.DTOs.Lesson;
using backend.Models;

namespace backend.DTOs.Classroom
{
    public class ViewClassroomResponseDto
    {
        public int ClassroomId { get; set; }
        public string ClassName { get; set; }
        public int TeacherId { get; set; }
        public string Section { get; set; }
        public string Description { get; set; }
        public List<ViewLessonFromClassroomDto> Lessons { get; set; }
    }
}