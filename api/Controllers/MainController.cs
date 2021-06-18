using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

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

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
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
        public ActionResult GetAuthorization()
        {
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
