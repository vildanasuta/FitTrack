using System;
using System.Collections.Generic;

namespace FitTrack.Model;

public partial class FitnessActivity
{
    public int FitnessActivityId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly ActivityDate { get; set; }

    public TimeOnly ActivityTime { get; set; }

    public int DurationInMinutes { get; set; }

    public int? UserId { get; set; }

    public int? ActivityTypeId { get; set; }

    public virtual ActivityType? ActivityType { get; set; }

    public virtual User? User { get; set; }
}
