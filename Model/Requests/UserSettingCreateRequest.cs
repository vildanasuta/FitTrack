namespace FitTrack.Model.Requests
{
    public class UserSettingCreateRequest
    {
        public int UserId { get; set; }

        public int? GoalTypeId { get; set; }

        public int GoalValue { get; set; }
    }
}
