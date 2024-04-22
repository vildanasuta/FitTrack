using System;
using System.Collections.Generic;

namespace FitTrack.Services;

public partial class GoalType
{
    public int GoalTypeId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<UserSetting> UserSettings { get; set; } = new List<UserSetting>();
}
