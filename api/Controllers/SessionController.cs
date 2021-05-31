// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Logging;
// using Serilog;
// using PredictionApi.Models;

// namespace PredictionApi.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class SessionController : ControllerBase
//     {
//         private readonly ILogger<SessionController> _logger;
//         readonly IDiagnosticContext _diagnosticContext;
//         //private readonly ISessionService _sessionService;

//         public SessionController(ILogger<SessionController> logger, IDiagnosticContext diagnosticContext)
//         {
//             _logger = logger;
//             _diagnosticContext = diagnosticContext ?? throw new ArgumentNullException(nameof(diagnosticContext));
//         }

//         // GET: api/Session/CreateOrGet/12345
//         // TODO update to infer from auth token
//         [HttpGet("CreateOrGet/{userId}")]
//         public async Task<ActionResult<Session>> CreateOrGetSession(string userId)
//         {
//             var session = await _sessionService.CreateOrGetSession(userId);
//             _logger.LogInformation("CreateOrGetSession {@session}", session);
//             return session;
//         }

//         // GET: api/session/9d16653d-7d70-4729-bc99-4504df69ca6e
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Session>> GetSession(Guid id)
//         {
//             var session = await _sessionService.GetSession(id);

//             if (session == null)
//             {
//                 return NotFound();
//             }

//             return session;
//         }

//         // POST: api/session/update
//         [HttpPost("update")]
//         public async Task<ActionResult<Session>> UpdateSession(UpdateSessionParams updateSessionParams)
//         {
//             var session = await _sessionService.UpdateSession(updateSessionParams);
//             _logger.LogInformation("UpdateSession {@session}", session);
//             return session;
//         }

//         /// <summary>
//         /// Generate exception for debugging
//         /// </summary>
//         [HttpGet("exception")]
//         public void GenerateException()
//         {
//             int zero = 0;
//             var error = 1 / zero;
//         }
//     }
// }
