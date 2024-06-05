# Stage 1: Build and publish the ASP.NET Core app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the ASP.NET Core project files
COPY ["backend.csproj", "."]
RUN dotnet restore "backend.csproj"

# Copy the entire project and build it
COPY . .
RUN dotnet build "backend.csproj" -c Release -o /app/build
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# Stage 2: Serve the app with ASP.NET Core
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "backend.dll"]

