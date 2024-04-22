using FitTrack.Model;

namespace FitTrack.Services
{
    public interface IFitnessActivityService : ICRUDService<Model.FitnessActivity, Model.SearchObjects.FitnessActivitySearchObject, Model.Requests.FitnessActivityCreateRequest, Model.Requests.FitnessActivityUpdateRequest>
    {
        public Task<PagedResult<Model.FitnessActivity>> GetFilteredByDate(DateTime date);
        public Task<PagedResult<Model.FitnessActivity>> GetFilteredByActivityType(int activityId);
    }
}
