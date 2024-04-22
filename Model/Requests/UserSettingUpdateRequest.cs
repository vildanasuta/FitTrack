namespace FitTrack.Model.Requests
{
    public class UserSettingUpdateRequest
    {
        public int UserId { get; set; }

        public int? GoalTypeId { get; set; }

        public int GoalValue { get; set; }
    }
}
