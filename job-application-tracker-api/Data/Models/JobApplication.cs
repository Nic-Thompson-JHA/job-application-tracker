using System.Text.Json.Serialization;

namespace job_application_tracker_api.Data.Models
{
    public class JobApplication
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum ApplicationStatus
        {
            Interview,
            Offer,
            Rejected
        }

        public required int Id { get; set; }

        public required string CompanyName { get; set; }

        public required string Position { get; set; }

        public ApplicationStatus? Status { get; set; }

        public DateTime DateApplied { get; set; }

        public string? Actions { get; set; }
    }
}
