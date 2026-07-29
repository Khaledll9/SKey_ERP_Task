using Microsoft.EntityFrameworkCore;
using SKey.Application.DTOs;
using SKey.Application.Interfaces;
using SKey.Domain.Entities;
using SKey.Persistence.Context;

namespace SKey.Persistence.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly JwtTokenGenerator _jwtTokenGenerator;

    public UserService(AppDbContext context, JwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<ServiceResult<string>> RegisterUserAsync(RegisterUserDto registerUserDto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == registerUserDto.Email))
        {
            return ServiceResult<string>.Failure("The email address is already registered.");
        }

        if (!string.IsNullOrEmpty(registerUserDto.PhoneNumber) &&
            await _context.Users.AnyAsync(u => u.PhoneNumber == registerUserDto.PhoneNumber))
        {
            return ServiceResult<string>.Failure("The phone number is already registered.");
        }

        var user = new User
        {
            UserName = registerUserDto.UserName,
            PhoneNumber = registerUserDto.PhoneNumber,
            Email = registerUserDto.Email,
            Password = registerUserDto.Password,
            RoleId = Guid.Empty
        };


        await _context.Users.AddAsync(user);
        var result = await _context.SaveChangesAsync();

        var token = _jwtTokenGenerator.GenerateToken(user);

        if (result > 0)
        {
            return ServiceResult<string>.Success(token, "User registered successfully.");
        }

        return ServiceResult<string>.Failure("An error occurred while saving the data.");
    }
    public async Task<ServiceResult<string>> SignInAsync(SignInDto signInDto)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == signInDto.EmailOrPhone || u.PhoneNumber == signInDto.EmailOrPhone);

        if (user == null || user.Password != signInDto.Password)
        {
            return ServiceResult<string>.Failure("Something went wrong, User Registration failed.");
        }
        var token = _jwtTokenGenerator.GenerateToken(user);

        return ServiceResult<string>.Success(token, "Sign in successful.");

    }
}
