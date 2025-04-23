using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class StudentAssessmentResult
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int LessonAssessmentId { get; set; }
        public string SubmittedAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}