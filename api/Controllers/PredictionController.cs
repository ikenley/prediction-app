using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PredictionApi.Models;

namespace PredictionApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class PredictionController : ControllerBase
    {
        private readonly ILogger<PredictionController> _logger;
        private readonly IPredictionService _predictionService;

        public PredictionController(ILogger<PredictionController> logger, IPredictionService predictionService)
        {
            _logger = logger;
            _predictionService = predictionService;
        }

        [HttpPost("create")]
        public async Task<Prediction> CreateAsync(Prediction prediction)
        {
            string userId = HttpContext.User.GetUserId();
            var p = await _predictionService.CreateAsync(userId, prediction);
            return p;
        }

        [HttpGet("by-id/{id}")]
        public async Task<Prediction> GetByIdAsync(Guid id)
        {
            string userId = HttpContext.User.GetUserId();
            var prediction = await _predictionService.GetByIdAsync(userId, id);
            return prediction;
        }

        [HttpGet("by-user")]
        public async Task<List<Prediction>> GetByUserIdAsync()
        {
            string userId = HttpContext.User.GetUserId();
            var prediction = await _predictionService.GetByUserIdAsync(userId);
            return prediction;
        }

        [HttpPost("update")]
        public async Task<Prediction> UpdateAsync(Prediction prediction)
        {
            string userId = HttpContext.User.GetUserId();
            var p = await _predictionService.UpdateAsync(userId, prediction);
            return p;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(Guid id)
        {
            string userId = HttpContext.User.GetUserId();
            await _predictionService.DeleteAsync(userId, id);
            return Ok();
        }
    }
}
