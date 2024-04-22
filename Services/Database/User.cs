using System;
using System.Collections.Generic;

namespace FitTrack.Services;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<FitnessActivity> FitnessActivities { get; set; } = new List<FitnessActivity>();

    public virtual UserSetting? UserSetting { get; set; }
}
