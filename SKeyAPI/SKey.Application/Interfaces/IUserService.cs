using SKey.Application.DTOs;

namespace SKey.Application.Interfaces;

public interface IUserService
{
    Task<bool> RegisterUserAsync(RegisterUserDto registerUserDto);
}