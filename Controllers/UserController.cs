using FitTrack.Model;
using FitTrack.Model.SearchObjects;
using FitTrack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

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

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { Token = token });
        }
    }
}
