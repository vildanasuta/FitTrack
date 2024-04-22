namespace FitTrack.Model.Requests
{
    public class ActivityTypeUpdateRequest
    {
        public int ActivityTypeId { get; set; }

        public string Name { get; set; } = null!;
    }
}
