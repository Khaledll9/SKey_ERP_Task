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

        if (!result.IsSuccess)
        {
            return BadRequest(new { message = result.Message });
        }

        return Ok(new { token = result.Data, message = result.Message });
    }
    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] SignInDto signInDto)
    {
        var result = await _userService.SignInAsync(signInDto);

        if (!result.IsSuccess)
        {
            return BadRequest(new { message = result.Message });
        }

        return Ok(new { token = result.Data, message = result.Message });
    }
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
    {
        var result = await _userService.CreateUserAsync(dto);

        if (!result.IsSuccess)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateUserDto dto)
    {
        var result = await _userService.UpdateUserAsync(dto);

        if (!result.IsSuccess)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _userService.DeleteUserAsync(id);

        if (!result.IsSuccess)
        {
            return NotFound(result);
        }

        return Ok(result);
    }
}