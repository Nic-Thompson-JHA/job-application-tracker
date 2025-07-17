using job_application_tracker_api.Data.Db;
using job_application_tracker_api.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var CorsOrigins = "CorsOrigins";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<JobApplicationDBContext>(opt => opt.UseInMemoryDatabase("JobApplicationList"));
builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(CorsOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
