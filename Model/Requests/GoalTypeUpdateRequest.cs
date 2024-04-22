namespace FitTrack.Model.Requests
{
    public class GoalTypeUpdateRequest
    {
        public int GoalTypeId { get; set; }

        public string Name { get; set; } = null!;
    }
}
