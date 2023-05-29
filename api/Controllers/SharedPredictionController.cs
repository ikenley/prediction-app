using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PredictionApi.Models;

namespace PredictionApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/shared-prediction")]
    public class SharedPredictionController : ControllerBase
    {
        private readonly ILogger<SharedPredictionController> _logger;
        private readonly ISharedPredictionService _sharedPredictionService;

        public SharedPredictionController(ILogger<SharedPredictionController> logger, ISharedPredictionService sharedPredictionService)
        {
            _logger = logger;
            _sharedPredictionService = sharedPredictionService;
        }

        [HttpPost("")]
        public async Task<SharedPrediction> CreateAsync(CreateSharedPredictionRequest req)
        {
            string userId = HttpContext.User.GetUserId();
            var sp = await _sharedPredictionService.CreateAsync(userId, req);
            return sp;
        }
    }
}
