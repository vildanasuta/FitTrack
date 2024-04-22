using AutoMapper;
using FitTrack.Model;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;

namespace FitTrack.Services
{
    public class FitnessActivityService : BaseCRUDService<Model.FitnessActivity, FitnessActivity, FitnessActivitySearchObject, FitnessActivityCreateRequest, FitnessActivityUpdateRequest>, IFitnessActivityService
    {
        public FitnessActivityService(FitTrackContext context, IMapper mapper) : base(context, mapper)
        {
        }

        async Task<PagedResult<Model.FitnessActivity>> IFitnessActivityService.GetFilteredByDate(DateTime date)
        {
            var searchObject = new FitnessActivitySearchObject { ActivityDate = date };
            var filteredActivities = await Get(searchObject);
            return filteredActivities;
        }

        public async Task<PagedResult<Model.FitnessActivity>> GetFilteredByActivityType(int activityTypeId)
        {
            var searchObject = new FitnessActivitySearchObject { ActivityTypeId = activityTypeId };
            var filteredActivities = await Get(searchObject);
            return filteredActivities;
        }
    }
}

