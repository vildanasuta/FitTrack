using AutoMapper;
using FitTrack.Model.Requests;
using FitTrack.Model.SearchObjects;
using FitTrack.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace FitTrack.Services
{
    public class UserService : BaseCRUDService<Model.User,User, UserSearchObject, UserCreateRequest, UserUpdateRequest>, IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly FitTrackContext _dbContext;
        public UserService(FitTrackContext dbContext, IMapper mapper, IConfiguration configuration) : base(dbContext, mapper)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public override async Task<Model.User> Insert(UserCreateRequest request)
        {
            request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            return await base.Insert(request);
        }

        public async Task<string> Authenticate(string email, string password)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u =>
                u.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }

            // Authentication successful, generates JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
