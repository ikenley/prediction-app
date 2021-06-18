using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;

namespace PredictionApi.Models
{
    public class UserService : IUserService
    {
        private IAmazonDynamoDB _dynamoDBClient;

        public UserService(IAmazonDynamoDB dynamoDBClient)
        {
            _dynamoDBClient = dynamoDBClient;
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
            var context = new DynamoDBContext(_dynamoDBClient);
            await context.SaveAsync(user);

            return user;
        }

        public async Task<User> GetByIdAsync(string id)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            var user = await context.LoadAsync<User>(id);
            return user;
        }

        private async Task<User> UpdateLastAccess(User user)
        {
            user.LastAccessed = DateTime.Now;

            var context = new DynamoDBContext(_dynamoDBClient);
            await context.SaveAsync(user);

            return user;
        }
    }
}