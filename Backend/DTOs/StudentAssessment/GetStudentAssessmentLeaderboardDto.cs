using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.StudentAssessment
{
    public class GetStudentAssessmentLeaderboardDto
    {
        public string ClassCode { get; set; }
        public int AssessmentId { get; set; }
    }
}