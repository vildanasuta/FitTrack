using FitTrack.Model;

namespace FitTrack.Services
{
    public interface IFitnessActivityService : ICRUDService<Model.FitnessActivity, Model.SearchObjects.FitnessActivitySearchObject, Model.Requests.FitnessActivityCreateRequest, Model.Requests.FitnessActivityUpdateRequest>
    {
        public Task<List<Services.FitnessActivity>> GetFilteredByDate(DateOnly date);
        public Task<List<Services.FitnessActivity>> GetFilteredByActivityType(int activityId);
        public Task<List<Services.FitnessActivity>> GetAllActivitiesForUserAndDate(int userId, DateOnly date);

    }
}
