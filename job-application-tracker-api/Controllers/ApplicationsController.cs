using Microsoft.AspNetCore.Mvc;

namespace job_application_tracker_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly ILogger<ApplicationsController> _logger;

        public ApplicationsController(ILogger<ApplicationsController> logger)
        {
            _logger = logger;
        }
    }
}
