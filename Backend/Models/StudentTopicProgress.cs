using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class StudentTopicProgress
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int LessonTopicId { get; set; }
        public bool IsViewed { get; set; }
        public DateTime ViewedAt { get; set; }
    }
}