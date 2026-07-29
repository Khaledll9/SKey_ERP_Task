using SKey.Domain.Enums;

namespace SKey.Application.DTOs;

public class RegisterUserDto
{
    public string UserName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public AccountStatus AccountStatus { get; set; } = AccountStatus.Active ;

    public Guid? RoleId { get; set; }
}