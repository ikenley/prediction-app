using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Formatting.Compact;

namespace PredictionApi;

/// <summary>
/// This class extends from APIGatewayProxyFunction which contains the method FunctionHandlerAsync which is the 
/// actual Lambda function entry point. The Lambda handler field should be set to
/// 
/// LambdaImageNetCore::LambdaImageNetCore.LambdaEntryPoint::FunctionHandlerAsync
/// </summary>
public class LambdaEntryPoint :

    // The base class must be set to match the AWS service invoking the Lambda function. If not Amazon.Lambda.AspNetCoreServer
    // will fail to convert the incoming request correctly into a valid ASP.NET Core request.
    //
    // API Gateway REST API                         -> Amazon.Lambda.AspNetCoreServer.APIGatewayProxyFunction
    // API Gateway HTTP API payload version 1.0     -> Amazon.Lambda.AspNetCoreServer.APIGatewayProxyFunction
    // API Gateway HTTP API payload version 2.0     -> Amazon.Lambda.AspNetCoreServer.APIGatewayHttpApiV2ProxyFunction
    // Application Load Balancer                    -> Amazon.Lambda.AspNetCoreServer.ApplicationLoadBalancerFunction
    // 
    // Note: When using the AWS::Serverless::Function resource with an event type of "HttpApi" then payload version 2.0
    // will be the default and you must make Amazon.Lambda.AspNetCoreServer.APIGatewayHttpApiV2ProxyFunction the base class.

    Amazon.Lambda.AspNetCoreServer.APIGatewayHttpApiV2ProxyFunction
{
    /// <summary>
    /// The builder has configuration, logging and Amazon API Gateway already configured. The startup class
    /// needs to be configured in this method using the UseStartup<>() method.
    /// </summary>
    /// <param name="builder">The IWebHostBuilder to configure.</param>
    protected override void Init(IWebHostBuilder builder)
    {
        var connectionStringParamName = Environment.GetEnvironmentVariable("CONNECTION_STRING_SSM_PARAM_NAME");
        // Get sensitive variables from SSM Parameters
        var ssmClient = new Amazon.SimpleSystemsManagement.AmazonSimpleSystemsManagementClient();
        var ssmParamLoader = new SsmParamLoader(ssmClient);
        ssmParamLoader.LoadToEnv(connectionStringParamName, "CONNECTION_STRING").GetAwaiter().GetResult();

        var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        Console.WriteLine($"connectionString={connectionString}");
    }


    /// <summary>
    /// Use this override to customize the services registered with the IHostBuilder. 
    /// 
    /// It is recommended not to call ConfigureWebHostDefaults to configure the IWebHostBuilder inside this method.
    /// Instead customize the IWebHostBuilder in the Init(IWebHostBuilder) overload.
    /// </summary>
    /// <param name="builder">The IHostBuilder to configure.</param>
    protected override void Init(IHostBuilder builder)
    {
        // The initial "bootstrap" logger is able to log errors during start-up. It's completely replaced by the
        // logger configured in `UseSerilog()` below, once configuration and dependency-injection have both been
        // set up successfully.
        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console(new RenderedCompactJsonFormatter())
            .CreateBootstrapLogger();

        Log.Information("Starting up!");

        try
        {
            Log.Information("Starting web host");
            builder
            .UseSerilog((context, services, configuration) => configuration
                .ReadFrom.Configuration(context.Configuration)
            )
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.AddSystemsManager("/prediction-app/app");
                config.AddEnvironmentVariables(prefix: "PREDICTION_APP_");
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Host terminated unexpectedly");
        }
        finally
        {
            Log.CloseAndFlush();
        }
    }
}