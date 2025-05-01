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
        public int TopicId { get; set; }
        public Topic Topic { get; set; }
    }
}