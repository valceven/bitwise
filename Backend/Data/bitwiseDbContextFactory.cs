using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace backend.Data
{
    public class bitwiseDbContextFactory : IDesignTimeDbContextFactory<bitwiseDbContext>
    {
        public bitwiseDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<bitwiseDbContext>();

            // Load the connection string from environment variables
            var connectionString = "User Id=postgres.htqywytrasfxnfqftjrx;Password=ValMarsKeiruKyle123;Server=aws-0-ap-southeast-1.pooler.supabase.com;Port=5432;Database=postgres" ??
                                   throw new InvalidOperationException("SUPABASE_DB_CONNECTIONz is not set in the environment variables.");

            optionsBuilder.UseNpgsql(connectionString);

            return new bitwiseDbContext(optionsBuilder.Options);
        }
    }
}