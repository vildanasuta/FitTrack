using FitTrack.Model;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;
using FitTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: BaseCRUDController<Model.User, Model.SearchObjects.UserSearchObject, Model.Requests.UserCreateRequest, Model.Requests.UserUpdateRequest>
    {
        private readonly IUserService _userService;

        public UserController(ILogger<BaseController<Model.User, UserSearchObject>> logger, IUserService service) : base(logger, service)
        {
            _userService = service;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var token = await _userService.Authenticate(request.Email, request.Password);
            var user = _userService.Get().Result.Result.FirstOrDefault(u => u.Email == request.Email);
            if (token == null || user == null)
            {
                return Unauthorized();
            }

            return Ok(new { Token = token, UserId = user.UserId });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreateRequest request)
        {
            var result = await _userService.Register(request);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new { message = result.Message, user = result.User });
        }

        [ApiExplorerSettings(IgnoreApi = true)] // hiding Insert method since already have Register method
        public override async Task<Model.User> Insert(UserCreateRequest request)
        {
            return await base.Insert(request);
        }

    }
}
