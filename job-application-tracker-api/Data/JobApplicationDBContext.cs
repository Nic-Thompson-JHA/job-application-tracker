using job_application_tracker_api.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace job_application_tracker_api.Data
{
    public class JobApplicationDBContext : DbContext
    {
        public JobApplicationDBContext(DbContextOptions<JobApplicationDBContext> options) : base(options) { }

        public DbSet<JobApplication> JobApplications => Set<JobApplication>();
    }
}
