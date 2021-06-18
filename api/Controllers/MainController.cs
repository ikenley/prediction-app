using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using PredictionApi.Models;

namespace PredictionApi.Controllers
{
    /// <summary>
    /// Main controller for reporting status, authorization, etc.
    /// </summary>
    [ApiController]
    [Route("api")]
    public class MainController : ControllerBase
    {
        private readonly ILogger<MainController> _logger;
        private readonly IUserService _userService;

        public MainController(ILogger<MainController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        // GET /api/status
        [HttpGet("status")]
        public string GetStatus()
        {
            return "{ status: \"ok\" }";
        }

        // GET /api/main/authorization
        [HttpGet("main/authorization")]
        [Authorize]//(Roles = Role.TodoNameRole)
        public async Task<ActionResult> GetAuthorization()
        {
            await _userService.CreateOrUpdateAsync(HttpContext.User);
            return Ok();
        }

        /// <summary>
        /// Generate exception for debugging
        /// </summary>
        // GET /api/main/exception
        [HttpGet("main/exception")]
        public void GenerateException()
        {
            int zero = 0;
            var error = 1 / zero;
        }
    }
}
