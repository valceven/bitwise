using backend.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using backend.Repositories;
using backend.Repositories.Interfaces;
using backend.Services;

DotNetEnv.Env.Load(); // Load environment variables from .env file
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var dbPassword = Environment.GetEnvironmentVariable("BITWISE_DB_PASSWORD");
var connectionString = builder.Configuration.GetConnectionString("bitwiseDbContext")
    .Replace("{BITWISE_DB_PASSWORD}", dbPassword);

builder.Services.AddDbContext<bitwiseDbContext>(options =>
    options.UseNpgsql(connectionString));

// Register Repository & Service
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseHttpsRedirection();
app.Run();