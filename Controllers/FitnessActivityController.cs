using FitTrack.Model.SearchObjects;
using FitTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FitnessActivityController : BaseCRUDController<Model.FitnessActivity, Model.SearchObjects.FitnessActivitySearchObject, Model.Requests.FitnessActivityCreateRequest, Model.Requests.FitnessActivityUpdateRequest>
    {
        private readonly IFitnessActivityService _fitnessActivityService;

        public FitnessActivityController(ILogger<BaseController<Model.FitnessActivity, FitnessActivitySearchObject>> logger, IFitnessActivityService service) : base(logger, service)
        {
            _fitnessActivityService = service;
        }

        [HttpGet("filterByDate")]
        public async Task<IActionResult> FilterByDate(DateTime date)
        {
            var filteredActivities = await _fitnessActivityService.GetFilteredByDate(date);
            return Ok(filteredActivities);
        }

        [HttpGet("filterByActivityType")]
        public async Task<IActionResult> FilterByActivityType(int activityTypeId)
        {
            var filteredActivities = await _fitnessActivityService.GetFilteredByActivityType(activityTypeId);
            return Ok(filteredActivities);
        }
    }
}
