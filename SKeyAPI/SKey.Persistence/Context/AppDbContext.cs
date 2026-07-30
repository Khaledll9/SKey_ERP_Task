using Microsoft.EntityFrameworkCore;
using SKey.Domain.Entities;

namespace SKey.Persistence.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var adminRoleId = Guid.Parse("11111111-1111-1111-1111-111111111111"); 
        var accountantRoleId = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var managerRoleId = Guid.Parse("33333333-3333-3333-3333-333333333333");

        modelBuilder.Entity<Role>().HasData(
            new Role { Id = adminRoleId, Name = "admin" },
            new Role { Id = accountantRoleId, Name = "accountant" },
            new Role { Id = managerRoleId, Name = "manager" }
        );

        var adminUserId = Guid.Parse("99999999-9999-9999-9999-999999999999");
        string hashedPassword = "$2a$11$qS4.41I5eUaAn7lH.7G85eS/D03iQ2NkWaZ75tK.JpE4V.f24f5aG";

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = adminUserId,
                UserName = "Khaled Mamdooh",
                Email = "Khaledmamdooh77@gmail.com",
                Password = hashedPassword,
                RoleId = adminRoleId
            }
        );

    }
    }