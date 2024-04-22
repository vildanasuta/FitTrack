using AutoMapper;
using FitTrack.Model;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;

namespace FitTrack.Services
{
    public class UserSettingService : BaseCRUDService<Model.UserSetting, UserSetting, UserSettingSearchObject, UserSettingCreateRequest, UserSettingUpdateRequest>, IUserSettingService
    {
        public UserSettingService(FitTrackContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}
