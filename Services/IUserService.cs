using FitTrack.Model.Requests;
using static FitTrack.Services.UserService;

namespace FitTrack.Services
{
    public interface IUserService : ICRUDService<Model.User, Model.SearchObjects.UserSearchObject, Model.Requests.UserCreateRequest, Model.Requests.UserUpdateRequest>
    {
        public Task<string> Authenticate(string email, string password);
        public Task<RegistrationResult> Register(UserCreateRequest request);
    }
}
