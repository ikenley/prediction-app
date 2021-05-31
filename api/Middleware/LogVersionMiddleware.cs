

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Serilog.Context;

namespace PredictionApi.Middleware
{
    public class LogVersionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly string _version;

        public LogVersionMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            this.next = next;
            this._version = configuration["Version"];
        }

        public Task Invoke(HttpContext context)
        {
            LogContext.PushProperty("Version", _version);

            return next(context);
        }
    }
}