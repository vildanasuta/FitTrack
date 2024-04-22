namespace FitTrack.Model.Requests
{
    public class UserUpdateRequest
    {
        public int UserId { get; set; }

        public string Username { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;
    }
}
