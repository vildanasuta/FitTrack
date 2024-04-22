using System;
using System.Collections.Generic;

namespace FitTrack.Model;

public partial class UserSetting
{
    public int UserId { get; set; }

    public int? GoalTypeId { get; set; }

    public int GoalValue { get; set; }

    public virtual GoalType? GoalType { get; set; }

    public virtual User User { get; set; } = null!;
}
