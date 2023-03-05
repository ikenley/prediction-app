using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PredictionApi.Models
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;

        public UserService(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public async Task<User> CreateOrUpdateAsync(ClaimsPrincipal principal)
        {
            var principalUser = GetUserFromClaimPrincipal(principal);

            var existingUser = await GetByIdAsync(principalUser.Id);
            if (existingUser != null)
            {
                await UpdateLastAccess(existingUser);
                return existingUser;
            }
            else
            {
                await Create(principalUser);
                return principalUser;
            }
        }

        private User GetUserFromClaimPrincipal(ClaimsPrincipal principal)
        {
            string userId = principal.GetClaimValue(JwtRegisteredClaimNames.Sub);
            string firstName = principal.GetClaimValue(JwtRegisteredClaimNames.GivenName);
            string lastName = principal.GetClaimValue(JwtRegisteredClaimNames.FamilyName);
            string email = principal.GetClaimValue(JwtRegisteredClaimNames.Email);

            var user = new User(userId, firstName, lastName, email);

            return user;
        }

        private async Task<User> Create(User user)
        {
            this._dataContext.Users.Add(user);
            await this._dataContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetByIdAsync(string id)
        {
            var user = await this._dataContext.Users.FindAsync(id);
            return user;
        }

        private async Task<User> UpdateLastAccess(User user)
        {
            user.LastAccessed = DateTime.Now;

            await this._dataContext.SaveChangesAsync();

            return user;
        }
    }
}