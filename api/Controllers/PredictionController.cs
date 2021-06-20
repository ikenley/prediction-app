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
        private readonly ILogger<ResultController> _logger;
        private readonly IPredictionService _predictionService;

        public PredictionController(ILogger<ResultController> logger, IPredictionService predictionService)
        {
            _logger = logger;
            _predictionService = predictionService;
        }

        [HttpPost("create")]
        public async Task<Prediction> CreateAsync(string userId, Prediction prediction)
        {
            var p = await _predictionService.CreateAsync(userId, prediction);
            return p;
        }

        [HttpGet("by-id/{userId}/{id}")]
        public async Task<Prediction> GetByIdAsync(string userId, Guid id)
        {
            var prediction = await _predictionService.GetByIdAsync(userId, id);
            return prediction;
        }

        [HttpGet("by-user/{userId}")]
        public async Task<List<Prediction>> GetByUserIdAsync(string userId)
        {
            var prediction = await _predictionService.GetByUserIdAsync(userId);
            return prediction;
        }

        [HttpPost("update")]
        public async Task<Prediction> UpdateAsync(string userId, Prediction prediction)
        {
            var p = await _predictionService.UpdateAsync(userId, prediction);
            return p;
        }

        public async Task<ActionResult> DeleteAsync(string userId, Guid id)
        {
            var prediction = await _predictionService.DeleteAsync(userId, id);
            return Ok();
        }
    }
}
