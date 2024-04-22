using FitTrack.Model.SearchObjects;
using FitTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserSettingController : BaseCRUDController<Model.UserSetting, Model.SearchObjects.UserSettingSearchObject, Model.Requests.UserSettingCreateRequest, Model.Requests.UserSettingUpdateRequest>
    {
        private readonly IUserSettingService _userSettingService;

        public UserSettingController(ILogger<BaseController<Model.UserSetting, UserSettingSearchObject>> logger, IUserSettingService service) : base(logger, service)
        {
            _userSettingService = service;
        }
    }
}
