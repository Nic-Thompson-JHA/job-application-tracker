using job_application_tracker_api.Data.Models;

namespace job_application_tracker_api.Data.Interfaces
{
    public interface IJobApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetJobApplications();

        Task<JobApplication> GetJobApplicationById(int id);

        Task<JobApplication> AddJobApplication(JobApplication jobApplication);

        Task<JobApplication> UpdateJobApplication(JobApplication jobApplication);

        Task<JobApplication> DeleteJobApplication(int id);
    }
}
