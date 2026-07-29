using Microsoft.AspNetCore.Mvc;
using SKey.Application.DTOs;
using SKey.Application.Interfaces;

namespace SKeyAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
    {
        var result = await _userService.RegisterUserAsync(registerUserDto);

        if (!result)
        {
            return BadRequest(new { message = "User already exists or registration failed." });
        }

        return Ok(new { message = "User registered successfully!" });
    }
}