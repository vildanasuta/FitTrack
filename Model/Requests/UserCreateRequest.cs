namespace FitTrack.Model.Requests
{
    public class UserCreateRequest
    {
        public string Username { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;
    }
}
