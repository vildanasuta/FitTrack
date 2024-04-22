using AutoMapper;

namespace FitTrack.Services
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, Model.User>();
            CreateMap<Model.Requests.UserCreateRequest, User>();
            CreateMap<Model.Requests.UserUpdateRequest, User>();

            CreateMap<ActivityType, Model.ActivityType>();
            CreateMap<Model.Requests.ActivityTypeCreateRequest, ActivityType>();
            CreateMap<Model.Requests.ActivityTypeUpdateRequest, ActivityType>();

            CreateMap<UserSetting, Model.UserSetting>();
            CreateMap<Model.Requests.UserSettingCreateRequest, UserSetting>();
            CreateMap<Model.Requests.UserSettingUpdateRequest, UserSetting>();

            CreateMap<FitnessActivity, Model.FitnessActivity>();
            CreateMap<Model.Requests.FitnessActivityCreateRequest, FitnessActivity>();
            CreateMap<Model.Requests.FitnessActivityUpdateRequest, FitnessActivity>();

            CreateMap<GoalType, Model.GoalType>();
            CreateMap<Model.Requests.GoalTypeCreateRequest, GoalType>();
            CreateMap<Model.Requests.GoalTypeUpdateRequest, GoalType>();
        }
    }
}
