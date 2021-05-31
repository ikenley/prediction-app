# PredictionApi

Sample .NET Core API to be hosted in a Docker container

---

## Docker

- [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-5.0)
- [Dockerfile based on](https://docs.docker.com/engine/examples/dotnetcore/)

```
docker build -t prediction-api --build-arg ASPNETCORE_ENVIRONMENT=Development .
docker run --rm -it -p 5000:5000 prediction-api
```

---

## General .NET Core development

- [Create a web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio-code)
- [Entity Framework Core Migrations](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)
- [Configuration in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0)

```
# Create a migration and apply it to DB
dotnet ef migrations add InitialCreate
dotnet ef database update

# Generate SQL script from a blank database to the latest migration:
dotnet ef migrations script

# Revert to previous version
dotnet ef database update 20210331150331_Region

# Undo previous migration
dotnet ef migrations remove

# Scaffold a controller based on a given model
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet aspnet-codegenerator controller -name SessionController -async -api -m PredictionApi.Models.Session -dc DataContext -outDir Controllers

# Set ENV configuration variable
# (Must use cmd as Administrator)
setx TEMPLATE_APP_VERSION "local" /M
```
