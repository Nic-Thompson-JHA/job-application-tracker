using job_application_tracker_api.Data.Interfaces;
using job_application_tracker_api.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace job_application_tracker_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly ILogger<ApplicationsController> _logger;
        private readonly IJobApplicationRepository jobApplicationRepository;

        public ApplicationsController(ILogger<ApplicationsController> logger, IJobApplicationRepository jobApplicationRepository)
        {
            _logger = logger;
            this.jobApplicationRepository = jobApplicationRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetJobApplications()
        {
            try
            {
                return Ok(await jobApplicationRepository.GetJobApplications());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<JobApplication>> GetJobApplication(int id)
        {
            try
            {
                var result = await jobApplicationRepository.GetJobApplicationById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<JobApplication>> CreateJobApplication(JobApplication jobApplication)
        {
            try
            {
                if (jobApplication == null)
                    return BadRequest();

                var createdJobApplication = await jobApplicationRepository.AddJobApplication(jobApplication);

                return CreatedAtAction(nameof(GetJobApplication), new { id = createdJobApplication.Id }, createdJobApplication);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<JobApplication>> UpdateEmployee(int id, JobApplication jobApplication)
        {
            try
            {
                if (id != jobApplication.Id) return BadRequest("Job Application Id mismatch");

                var jobApplicationToUpdate = await jobApplicationRepository.GetJobApplicationById(id);

                if (jobApplicationToUpdate == null) return NotFound($"Job Application with Id = {id} not found");

                return await jobApplicationRepository.UpdateJobApplication(jobApplication);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<JobApplication>> DeleteJobApplication(int id)
        {
            try
            {
                var jobApplicationToDelete = await jobApplicationRepository.GetJobApplicationById(id);

                if (jobApplicationToDelete == null)
                {
                    return NotFound($"Employee with Id = {id} not found");
                }

                return await jobApplicationRepository.DeleteJobApplication(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
