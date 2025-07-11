using job_application_tracker_api.Data.Interfaces;
using job_application_tracker_api.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace job_application_tracker_api.Data.Db
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private JobApplicationDBContext appDbContext;

        public JobApplicationRepository(JobApplicationDBContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<JobApplication> AddJobApplication(JobApplication jobApplication)
        {
            var result = await appDbContext.JobApplications.AddAsync(jobApplication);
            await appDbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<JobApplication> DeleteJobApplication(int id)
        {
            var result = await appDbContext.JobApplications.FirstOrDefaultAsync(j => j.Id == id);
            if (result != null)
            {
                appDbContext.JobApplications.Remove(result);
                await appDbContext.SaveChangesAsync();
                return result;
            }

            return null;
        }

        public async Task<JobApplication> GetJobApplicationById(int id)
        {
            return await appDbContext.JobApplications.FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<IEnumerable<JobApplication>> GetJobApplications()
        {
            return await appDbContext.JobApplications.ToListAsync();
        }

        public async Task<JobApplication> UpdateJobApplication(JobApplication jobApplication)
        {
            var application = await appDbContext.JobApplications.FirstOrDefaultAsync(j => j.Id == jobApplication.Id);

            if (application is null) return null;

            application.CompanyName = jobApplication.CompanyName;
            application.Position = jobApplication.Position;
            application.Status = jobApplication.Status;
            application.Actions = jobApplication.Actions;

            await appDbContext.SaveChangesAsync();

            return application;
        }
    }
}
