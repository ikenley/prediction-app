FROM public.ecr.aws/lambda/dotnet:6 as base
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["*.csproj", "./"]
RUN dotnet restore

WORKDIR "/src/prediction"
COPY . .
RUN dotnet build "PredictionApi.csproj" --configuration Release --output /app/build

FROM build AS publish
RUN dotnet publish "PredictionApi.csproj" \
    --configuration Release \ 
    --runtime linux-x64 \
    --self-contained false \ 
    --output /app/publish \
    -p:PublishReadyToRun=true  

FROM base AS final
WORKDIR /var/task
COPY --from=publish /app/publish .
