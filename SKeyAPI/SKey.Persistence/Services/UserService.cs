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
            return ServiceResult<string>.Failure("البريد الإلكتروني مستخدم من قبل بالفعل.");
        }

        if (!string.IsNullOrEmpty(registerUserDto.PhoneNumber) &&
            await _context.Users.AnyAsync(u => u.PhoneNumber == registerUserDto.PhoneNumber))
        {
            return ServiceResult<string>.Failure("رقم الهاتف مستخدم من قبل بالفعل.");
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
            return ServiceResult<string>.Success(token, "تم تسجيل المستخدم بنجاح");
        }

        return ServiceResult<string>.Failure("حدث خطأ أثناء حفظ البيانات");
    }
    public async Task<ServiceResult<string>> SignInAsync(SignInDto signInDto)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == signInDto.EmailOrPhone || u.PhoneNumber == signInDto.EmailOrPhone);

        if (user == null || user.Password != signInDto.Password)
        {
            return ServiceResult<string>.Failure("كلمة المرور | البريد الالكتروني او كلمة السر غير صحيحة");
        }
        var token = _jwtTokenGenerator.GenerateToken(user);

        return ServiceResult<string>.Success(token, "تم إنشاء المستخدم بنجاح.");

    }
    public async Task<ServiceResult<bool>> CreateUserAsync(CreateUserDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
        {
            return ServiceResult<bool>.Failure("البريد الإلكتروني مستخدم بالفعل.");
        }

        var user = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
            PhoneNumber = string.Empty,
            Password = "Password123!", 
            AccountStatus = dto.AccountStatus,
            RoleId = dto.RoleId ?? Guid.Empty
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return ServiceResult<bool>.Success(true, "تم إنشاء المستخدم بنجاح.");
    }
}
