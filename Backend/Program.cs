using Supabase;
using backend.Repositories;
using backend.Repositories.Interfaces;
using backend.Services;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load(); // Load environment variables from .env file

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Supabase configuration
var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");
var options = new SupabaseOptions
{
    AutoRefreshToken = true,
    AutoConnectRealtime = true,
};

builder.Services.AddSingleton(provider => new Supabase.Client(url!, key, options));

// Database configuration
var connectionString = Environment.GetEnvironmentVariable("SUPABASE_DB_CONNECTION")
    ?? throw new InvalidOperationException("SUPABASE_DB_CONNECTION is not set in the environment variables.");

builder.Services.AddDbContext<bitwiseDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection") ?? connectionString));

// Authentication with JWTBearer
var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET")
    ?? throw new InvalidOperationException("JWT_SECRET is not set in the environment variables.");
var bytes = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(bytes),
            ValidAudience = builder.Configuration["Auth:ValidAudience"],
            ValidIssuer = builder.Configuration["Auth:ValidIssuer"],
        };
    });

// add https redirection
builder.Services.AddHttpsRedirection(options =>
{
    options.HttpsPort = 5159;  // Adjust this to match the port you want for HTTPS
});

// Register Repository & Service & Controllers
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // Specify full origin
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});


builder.Services.AddHttpContextAccessor();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapControllers();
});

app.Run();