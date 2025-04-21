using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class LessonTopic
    {
        public int LessonTopicId { get; set; }
        public int LessonId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public Lesson Lesson { get; set; }
    }
}