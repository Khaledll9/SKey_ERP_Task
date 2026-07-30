using Microsoft.AspNetCore.Identity;
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
    private readonly IPasswordHasher _passwordHasher; 

    public UserService(
        AppDbContext context,
        JwtTokenGenerator jwtTokenGenerator,
        IPasswordHasher passwordHasher) 
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
        _passwordHasher = passwordHasher;
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
            Password = _passwordHasher.HashPassword(registerUserDto.Password),
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
        bool isEmail = signInDto.EmailOrPhone.Contains("@");

        User? user = null;

        if (isEmail)
        {
            user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == signInDto.EmailOrPhone);

            if (user == null)
            {
                return ServiceResult<string>.Failure("البريد الإلكتروني غير مسجل لدينا.");
            }
        }
        else
        {
            user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.PhoneNumber == signInDto.EmailOrPhone);

            if (user == null)
            {
                return ServiceResult<string>.Failure("رقم الهاتف غير مسجل لدينا.");
            }
        }

        if (!_passwordHasher.VerifyPassword(signInDto.Password, user.Password))
        {
            return ServiceResult<string>.Failure("كلمة المرور غير صحيحة.");
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return ServiceResult<string>.Success(token, "تم تسجيل الدخول بنجاح.");
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
            Password = _passwordHasher.HashPassword("Password123!"),
            AccountStatus = dto.AccountStatus,
            RoleId = dto.RoleId ?? Guid.Empty
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return ServiceResult<bool>.Success(true, "تم إنشاء المستخدم بنجاح.");
    }

    public async Task<ServiceResult<bool>> UpdateUserAsync(UpdateUserDto dto)
    {
        var user = await _context.Users.FindAsync(dto.Id);
        if (user == null)
        {
            return ServiceResult<bool>.Failure("المستخدم غير موجود.");
        }

        user.UserName = dto.UserName;
        user.Email = dto.Email;
        user.AccountStatus = dto.AccountStatus;

        if (dto.RoleId.HasValue)
        {
            user.RoleId = dto.RoleId.Value;
        }

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return ServiceResult<bool>.Success(true, "تم تعديل بيانات المستخدم بنجاح.");
    }

    public async Task<ServiceResult<bool>> DeleteUserAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return ServiceResult<bool>.Failure("المستخدم غير موجود.");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return ServiceResult<bool>.Success(true, "تم حذف المستخدم بنجاح.");
    }

    public async Task<List<UserDto>> GetAllUsersAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .Select(u => new UserDto
            {
                Id = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                RoleId = u.RoleId,
                AccountStatus = u.AccountStatus
            })
            .ToListAsync();
    }
}