namespace FitTrack.Services
{
    public interface IService<T, TSearch> where TSearch : class
    {
        Task<Model.PagedResult<T>> Get(TSearch search = null);
        Task<T> GetById(int id);
    }
}
