using AutoMapper;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;
using FitTrack.Model;

namespace FitTrack.Services
{
    public class ActivityTypeService : BaseCRUDService<Model.ActivityType, ActivityType, ActivityTypeSearchObject, ActivityTypeCreateRequest, ActivityTypeUpdateRequest>, IActivityTypeService
    {
        public ActivityTypeService(FitTrackContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
