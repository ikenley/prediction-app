using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace PredictionApi.Models
{
    public interface ISharedPredictionService
    {
        Task<SharedPrediction> CreateAsync(string userId, CreateSharedPredictionRequest request);

        Task<List<SharedPrediction>> GetByPredictionIdAsync(Guid predictionId);
    }
}