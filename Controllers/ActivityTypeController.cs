using FitTrack.Model.SearchObjects;
using FitTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ActivityTypeController : BaseCRUDController<Model.ActivityType, Model.SearchObjects.ActivityTypeSearchObject, Model.Requests.ActivityTypeCreateRequest, Model.Requests.ActivityTypeUpdateRequest>
    {
        private readonly IActivityTypeService _activityTypeService;

        public ActivityTypeController(ILogger<BaseController<Model.ActivityType, ActivityTypeSearchObject>> logger, IActivityTypeService service) : base(logger, service)
        {
            _activityTypeService = service;
        }
    }
}
