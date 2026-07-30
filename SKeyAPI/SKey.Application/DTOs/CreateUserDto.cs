using System.ComponentModel.DataAnnotations;
using SKey.Domain.Enums;

namespace SKey.Application.DTOs;

public class CreateUserDto
{
    [Required(ErrorMessage = "اسم المستخدم مطلوب")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "البريد الإلكتروني مطلوب")]
    [EmailAddress(ErrorMessage = "صيغة البريد الإلكتروني غير صحيحة")]
    public string Email { get; set; } = string.Empty;

    public Guid? RoleId { get; set; }

    public AccountStatus AccountStatus { get; set; } = AccountStatus.Active;
}