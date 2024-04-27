using AutoMapper;
using FitTrack.Model;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.Services
{
    public class FitnessActivityService : BaseCRUDService<Model.FitnessActivity, FitnessActivity, FitnessActivitySearchObject, FitnessActivityCreateRequest, FitnessActivityUpdateRequest>, IFitnessActivityService
    {
        public FitnessActivityService(FitTrackContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<List<Services.FitnessActivity>> GetFilteredByDate(DateOnly date)
        {
            var filteredActivities = await _context.FitnessActivities
                .Where(a => a.ActivityDate == date)
                .ToListAsync();

            return filteredActivities;
        }

        public async Task<List<Services.FitnessActivity>> GetFilteredByActivityType(int activityTypeId)
        {
            var filteredActivities = await _context.FitnessActivities
                .Where(a => a.ActivityTypeId == activityTypeId)
                .ToListAsync();

            return filteredActivities;
        }

        public async Task<List<Services.FitnessActivity>> GetAllActivitiesForUserAndDate(int userId, DateOnly date)
        {
            var filteredActivities = await _context.FitnessActivities
                .Where(a => a.UserId == userId && a.ActivityDate == date)
                .ToListAsync();

            return filteredActivities;
        }
    }
}

