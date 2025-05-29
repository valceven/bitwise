using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.StudentAssessment
{
    public class ReturnStudentAssessmentLeaderboardDto
    {
        public int Rank { get; set; }
        public string StudentName { get; set; }
        public double Score { get; set; }
        public bool IsCompleted { get; set; }
    }
}