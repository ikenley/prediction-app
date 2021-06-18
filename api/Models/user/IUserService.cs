using System.Security.Claims;
using System.Threading.Tasks;

namespace PredictionApi.Models
{
    public interface IUserService
    {
        Task<User> CreateOrUpdateAsync(ClaimsPrincipal principal);

        Task<User> GetByIdAsync(string userId);
    }
}