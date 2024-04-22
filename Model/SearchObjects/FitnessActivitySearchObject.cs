namespace FitTrack.Model.SearchObjects
{
    public class FitnessActivitySearchObject:BaseSearchObject
    {
        public DateTime? ActivityDate { get; set; } 

        public int? ActivityTypeId { get; set; }
    }
}
