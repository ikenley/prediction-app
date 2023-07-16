using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PredictionApi.Models
{
    public interface IPredictionService
    {
        Task<Prediction> CreateAsync(string userId, Prediction prediction);

        Task<Prediction> GetByIdAsync(string userId, Guid id, bool includeSharedPredictions);

        Task<List<Prediction>> GetByUserIdAsync(string userId);

        Task<Prediction> UpdateAsync(string userId, Prediction prediction);

        Task DeleteAsync(string userId, Guid id);
    }
}