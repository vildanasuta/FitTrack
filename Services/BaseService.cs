using AutoMapper;
using FitTrack.Model;
using FitTrack.Model.SearchObjects;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.Services
{
    public class BaseService<T, TDb, TSearch> : IService<T, TSearch> where TDb : class where T : class where TSearch : BaseSearchObject
    {
        protected FitTrackContext _context;
        protected IMapper _mapper { get; set; }
        public BaseService(FitTrackContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public virtual async Task<Model.PagedResult<T>> Get(TSearch? search = null)
        {
            var query = _context.Set<TDb>().AsQueryable();

            Model.PagedResult<T> result = new Model.PagedResult<T>();



            query = AddFilter(query, search);

            query = AddInclude(query, search);

            result.Count = query.Count();

            if (search?.Page.HasValue == true && search?.PageSize.HasValue == true)
            {
                query = query.Skip((int)((search?.Page - 1) * search?.PageSize)).Take((int)(search?.PageSize));
            }

            var list = await query.ToListAsync();


            var tmp = _mapper.Map<List<T>>(list);
            result.Result = tmp;
            return result;
        }

        public virtual IQueryable<TDb> AddInclude(IQueryable<TDb> query, TSearch? search = null)
        {
            return query;
        }

        public virtual IQueryable<TDb> AddFilter(IQueryable<TDb> query, TSearch? search = null)
        {
            return query;
        }

        public virtual async Task<T> GetById(int id)
        {
            var entity = await _context.Set<TDb>().FindAsync(id);

            return _mapper.Map<T>(entity);
        }

    }
}
