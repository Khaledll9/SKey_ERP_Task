using SKey.Domain.Enums;

namespace SKey.Application.DTOs;

public class UserDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Guid RoleId { get; set; }
    public AccountStatus AccountStatus { get; set; }
}