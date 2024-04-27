namespace FitTrack.Model.SearchObjects
{
    public class FitnessActivitySearchObject:BaseSearchObject
    {
        public DateOnly? ActivityDate { get; set; } 

        public int? ActivityTypeId { get; set; }

        public int? UserId { get; set; }   
    }
}
