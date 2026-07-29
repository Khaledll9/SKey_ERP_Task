namespace SKey.Application.DTOs;

public class SignInDto
{
    public string EmailOrPhone { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}