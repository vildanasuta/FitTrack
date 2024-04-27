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
        IUserSettingService _userSettingService;
        public UserService(FitTrackContext dbContext, IMapper mapper, IConfiguration configuration, IUserSettingService userSettingService) : base(dbContext, mapper)
        {
            _configuration = configuration;
            _dbContext = dbContext;
            _userSettingService = userSettingService;
        }

        public class RegistrationResult
        {
            public bool Success { get; set; }
            public string Message { get; set; }
            public Model.User User { get; set; }
        }

        public async Task<RegistrationResult> Register(UserCreateRequest request)
        {
            // if user exists with the same username
            var existingUser = await _dbContext.Users.SingleOrDefaultAsync(u =>
                u.Username == request.Username);
            if (existingUser != null)
            {
                return new RegistrationResult
                {
                    Success = false,
                    Message = "Username already exists. Please choose a different one.",
                    User = null
                };
            }

            // if user exists with same email
            existingUser = await _dbContext.Users.SingleOrDefaultAsync(u =>
                            u.Email == request.Email);
            if (existingUser != null)
            {
                return new RegistrationResult
                {
                    Success = false,
                    Message = "Email already exists. Please use a different one.",
                    User = null
                };
            }

            request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = await base.Insert(request);

            UserSettingCreateRequest userSettingCreateRequest = new UserSettingCreateRequest
            {
                UserId = newUser.UserId,
                GoalTypeId = 1,
                GoalValue = 1
            };

            await _userSettingService.Insert(userSettingCreateRequest);

            return new RegistrationResult
            {
                Success = true,
                Message = "User registered successfully.",
                User = newUser
            };
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
