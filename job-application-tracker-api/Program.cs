using job_application_tracker_api.Data;
using job_application_tracker_api.Data.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<JobApplicationDBContext>(opt => opt.UseInMemoryDatabase("JobApplicationList"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapGet("/applications", static async (JobApplicationDBContext db) =>
    await db.JobApplications.ToListAsync());
app.MapGet("/applications/{id}", static async (int id, JobApplicationDBContext db) =>
    await db.JobApplications.FindAsync(id) is JobApplication jobApplication ? Results.Ok(jobApplication) : Results.NotFound());

app.MapPost("/applications", static async (JobApplication jobApplication, JobApplicationDBContext db) =>
{
    db.JobApplications.Add(jobApplication);
    await db.SaveChangesAsync();

    return Results.Created($"/Applications/{jobApplication.Id}", jobApplication);
});

app.MapPut("/applications/{id}", static async (int id, JobApplication jobApplication, JobApplicationDBContext db) =>
{
    var application = await db.JobApplications.FindAsync(id);

    if (application is null) return Results.NotFound();

    application.CompanyName = jobApplication.CompanyName;
    application.Position = jobApplication.Position;
    application.Status = jobApplication.Status;
    application.Actions = jobApplication.Actions;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
