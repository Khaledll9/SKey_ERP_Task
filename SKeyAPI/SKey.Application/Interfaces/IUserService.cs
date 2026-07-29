using SKey.Application.DTOs;

namespace SKey.Application.Interfaces;

public interface IUserService
{
    Task<ServiceResult> RegisterUserAsync(RegisterUserDto registerUserDto);
    Task<ServiceResult> SignInAsync(SignInDto signInDto);
}