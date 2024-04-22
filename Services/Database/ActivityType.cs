using System;
using System.Collections.Generic;

namespace FitTrack.Services;

public partial class ActivityType
{
    public int ActivityTypeId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<FitnessActivity> FitnessActivities { get; set; } = new List<FitnessActivity>();
}
