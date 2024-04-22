using FitTrack.Model.SearchObjects;
using FitTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GoalTypeController : BaseCRUDController<Model.GoalType, Model.SearchObjects.GoalTypeSearchObject, Model.Requests.GoalTypeCreateRequest, Model.Requests.GoalTypeUpdateRequest>
    {
        private readonly IGoalTypeService _goalTypeService;

        public GoalTypeController(ILogger<BaseController<Model.GoalType, GoalTypeSearchObject>> logger, IGoalTypeService service) : base(logger, service)
        {
            _goalTypeService = service;
        }
    }
}
