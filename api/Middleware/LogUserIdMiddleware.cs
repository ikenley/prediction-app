

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Serilog.Context;

namespace PredictionApi.Middleware
{
    public class LogUserIdMiddleware
    {
        private readonly RequestDelegate next;

        public LogUserIdMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public Task Invoke(HttpContext context)
        {
            bool hasUserId = context.Request.Headers.TryGetValue("X-APP-USERID", out var userId);
            if (hasUserId)
            {
                LogContext.PushProperty("UserId", userId.ToString());
            }

            return next(context);
        }
    }
}