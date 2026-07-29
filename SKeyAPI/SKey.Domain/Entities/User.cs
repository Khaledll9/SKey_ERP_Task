using SKey.Domain.Enums;
using System.Data;

namespace SKey.Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string UserName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public AccountStatus AccountStatus { get; set; } = AccountStatus.Active;

    public Guid RoleId { get; set; }

    public Role Role { get; set; } = null!;
}