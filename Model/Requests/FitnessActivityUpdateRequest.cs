namespace FitTrack.Model.Requests
{
    public class FitnessActivityUpdateRequest
    {
        public int FitnessActivityId { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateOnly ActivityDate { get; set; }

        public TimeOnly ActivityTime { get; set; }

        public int DurationInMinutes { get; set; }

        public int? UserId { get; set; }

        public int? ActivityTypeId { get; set; }

    }
}
