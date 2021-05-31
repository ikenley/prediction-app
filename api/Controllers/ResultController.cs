using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PredictionApi.Models;

namespace PredictionApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultController : ControllerBase
    {
        private static readonly string[] Names = new[]
        {
            "Dave", "Frank", "Heywood", "HAL", "Elena", "Bill", "Andrei"
        };

        private readonly ILogger<ResultController> _logger;

        public ResultController(ILogger<ResultController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<SampleResult> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new SampleResult
            {
                Date = DateTime.Now.AddDays(index),
                Name = Names[rng.Next(Names.Length)],
                Description = $"Open the pod bay doors, {Names[rng.Next(Names.Length)]}"
            })
            .ToArray();
        }
    }
}
