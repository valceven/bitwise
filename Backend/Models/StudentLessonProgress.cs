using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class StudentLessonProgress
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int LessonId { get; set; }
        public string Status { get; set; } // e.g. NotStarted, InProgress, Completed
        public DateTime LastUpdated { get; set; }
    }
}