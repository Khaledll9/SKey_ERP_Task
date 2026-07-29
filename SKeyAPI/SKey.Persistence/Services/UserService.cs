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

    public async Task<ServiceResult> RegisterUserAsync(RegisterUserDto registerUserDto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == registerUserDto.Email))
        {
            return ServiceResult.Failure("The email address is already registered.");
        }

        if (!string.IsNullOrEmpty(registerUserDto.PhoneNumber) &&
                                  await _context.Users.AnyAsync(u => u.PhoneNumber == registerUserDto.PhoneNumber))
        {
            return ServiceResult.Failure("The phone number is already registered.");
        }

        var adminRoleId = Guid.Parse("00000000-0000-0000-0000-000000000000");

        var user = new User
        {
            UserName = registerUserDto.UserName,
            PhoneNumber = registerUserDto.PhoneNumber,
            Email = registerUserDto.Email,
            Password = registerUserDto.Password,
            RoleId = registerUserDto.RoleId ?? adminRoleId,
        };


        await _context.Users.AddAsync(user);
        var result = await _context.SaveChangesAsync();

        if (result > 0)
        {
            return ServiceResult.Success("The user has been successfully registered.");
        }

        return ServiceResult.Failure("An error occurred while saving the data.");
    }
    public async Task<ServiceResult> SignInAsync(SignInDto signInDto)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == signInDto.EmailOrPhone || u.PhoneNumber == signInDto.EmailOrPhone);

        if (user == null || user.Password != signInDto.Password)
        {
            return ServiceResult.Failure("Something went wrong, User Registration failed.");
        }

        return ServiceResult.Success("Sign in successful!");
    }
}
