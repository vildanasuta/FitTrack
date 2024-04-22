using AutoMapper;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;
using FitTrack.Model;

namespace FitTrack.Services
{
    public class GoalTypeService : BaseCRUDService<Model.GoalType, GoalType, GoalTypeSearchObject, GoalTypeCreateRequest, GoalTypeUpdateRequest>, IGoalTypeService
    {
        public GoalTypeService(FitTrackContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
