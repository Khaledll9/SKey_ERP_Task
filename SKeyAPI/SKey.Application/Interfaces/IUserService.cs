using SKey.Application.DTOs;

namespace SKey.Application.Interfaces;

public interface IUserService
{
    Task<ServiceResult<string>> RegisterUserAsync(RegisterUserDto registerUserDto);
    Task<ServiceResult<string>> SignInAsync(SignInDto signInDto);
    Task<ServiceResult<bool>> CreateUserAsync(CreateUserDto dto);
}