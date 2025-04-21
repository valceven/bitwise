using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class LessonAssessment
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
    }
}