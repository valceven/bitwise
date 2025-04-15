using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class bitwiseDbContext : DbContext
    {
        public bitwiseDbContext(DbContextOptions<bitwiseDbContext> options) : base(options)
        {
        }

        public DbSet<Models.User> Users { get; set; }
        //public DbSet<Models.Admin> Admins { get; set; }
        public DbSet<Models.Teacher> Teachers { get; set; }
        public DbSet<Models.Topic> Topics { get; set; }
        public DbSet<Models.Student> Students { get; set; }
        public DbSet<Models.Lesson> Lessons { get; set; }
        public DbSet<Models.Leaderboard> Leaderboards { get; set; }
        public DbSet<Models.Assessment> Assessments { get; set; }
        public DbSet<Models.Classroom> Classrooms { get; set; }
        public DbSet<Models.LeaderboardEntry> LeaderboardEntries { get; set; }
        public DbSet<Models.Content> Contents { get; set; }
        public DbSet<Models.PendingUser> PendingUsers { get; set; }
        public DbSet<Models.StudentClassroom> StudentClassrooms { get; set; }
    }
}