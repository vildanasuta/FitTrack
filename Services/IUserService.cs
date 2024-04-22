namespace FitTrack.Services
{
    public interface IUserService : ICRUDService<Model.User, Model.SearchObjects.UserSearchObject, Model.Requests.UserCreateRequest, Model.Requests.UserUpdateRequest>
    {
        public Task<string> Authenticate(string email, string password);
    }
}
