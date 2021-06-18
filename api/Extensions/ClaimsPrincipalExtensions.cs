
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace PredictionApi
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            return GetClaimValue(user, JwtRegisteredClaimNames.Sub);
        }

        /// <summary>
        /// Gets the value of the first claim of a given ClaimType. Defaults to null.
        /// </summary>
        public static string GetClaimValue(this ClaimsPrincipal user, string claimType)
        {
            var claim = user.FindFirst(claimType);
            if (claim == null)
            {
                return string.Empty;
            }
            return claim.Value;
        }
    }
}