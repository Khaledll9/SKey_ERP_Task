using Microsoft.EntityFrameworkCore;
using SKey.Application.DTOs;
using SKey.Application.Interfaces;
using SKey.Domain.Entities;
using SKey.Persistence.Context;

namespace SKey.Persistence.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> RegisterUserAsync(RegisterUserDto registerUserDto)
    {
       
        var userExists = await _context.Users
            .AnyAsync(u => u.Email == registerUserDto.Email);

        if (userExists)
        {
            return false;
        }

       
        var user = new User
        {
            UserName = registerUserDto.Username,
            Email = registerUserDto.Email,
            Password = registerUserDto.Password, 
            RoleId = registerUserDto.RoleId
        };

        
        await _context.Users.AddAsync(user);
        var result = await _context.SaveChangesAsync();

        return result > 0;
    }
}