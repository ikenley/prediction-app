using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using PredictionApi.Middleware;
using PredictionApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace PredictionApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Fetch connection string
            // Name will be main-connection-string or main-connection-string-local
            // string connectionStringName = Configuration["main-connection-string-name"];
            string connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(connectionString)
                    .UseSnakeCaseNamingConvention()
            );

            services.AddHttpContextAccessor();

            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISharedPredictionService, SharedPredictionService>();
            services.AddScoped<IPredictionService, PredictionService>();

            // Add authentication
            string clientId = Configuration["auth:client-id"];
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(options =>
            {
                options.Audience = clientId;
                options.SecurityTokenValidators.Clear();
                options.SecurityTokenValidators.Add(new GoogleTokenValidator());
            });

            // TODO set via env vars
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.WithOrigins("https://*.ikenley.com")
                            .SetIsOriginAllowedToAllowWildcardSubdomains();
                    });
            });

            services.AddControllers();
            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            app.UseSerilogRequestLogging();
            app.UseMiddleware<LogVersionMiddleware>();
            app.UseMiddleware<LogUserIdMiddleware>();

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // https://stackoverflow.com/questions/69961449/net6-and-datetime-problem-cannot-write-datetime-with-kind-utc-to-postgresql-ty
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
    }
}
