using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using backend.Data;
using DotNetEnv;
using backend.Repositories;
using backend.Repositories.Interfaces;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables
DotNetEnv.Env.Load();  // Load environment variables from .env file

// Get the current environment (development or production)
var environment = builder.Environment.EnvironmentName.ToLower();

// Read the connection string based on the environment
var connectionString = environment == "production"
    ? builder.Configuration.GetConnectionString("AzureConnection")
    : builder.Configuration.GetConnectionString("SupabaseConnection");

// Add DbContext for PostgreSQL using the appropriate connection string
builder.Services.AddDbContext<bitwiseDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection") ?? connectionString));

// Register services for dependency injection
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IClassroomRepository, ClassroomRepository>();
builder.Services.AddScoped<IClassroomService, ClassroomService>();
builder.Services.AddControllers();

// Add authentication using JWT Bearer tokens
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Auth:ValidIssuer"]; // JWT authority URL from appsettings.json
        options.Audience = builder.Configuration["Auth:ValidAudience"]; // JWT audience from appsettings.json
        options.RequireHttpsMetadata = false; // Set to true for production

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Auth:SecretKey"] ?? string.Empty) // Use a fallback value
            )
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // Specify full origin
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});

// Add authorization services
builder.Services.AddAuthorization();

// Add Swagger service to generate OpenAPI documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Optionally, you can customize the Swagger documentation settings here
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Bitwise API", Version = "v1" });
});



var app = builder.Build();

// Set up Swagger for API documentation (in development mode)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Bitwise API V1");
    });
}

// Use authentication and authorization middleware
app.UseRouting();
app.UseCors("AllowFrontend"); // Use the CORS policy defined above
app.UseAuthentication();  // Add authentication middleware
//app.UseHttpsRedirection();
app.UseAuthorization();   // Add authorization middleware

app.MapControllers();

// Start the application
app.Run();
