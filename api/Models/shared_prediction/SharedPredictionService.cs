using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PredictionApi.Models
{
    public class SharedPredictionService : ISharedPredictionService
    {
        private readonly DataContext _dataContext;

        public SharedPredictionService(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public async Task<SharedPrediction> CreateAsync(string userId, CreateSharedPredictionRequest request)
        {
            var sp = new SharedPrediction();
            sp.PredictionId=request.PredictionId;
            sp.UserId=userId;
            sp.Probability = request.Probability;
            sp.CreatedOn = DateTime.Now;
            sp.LastUpdated = DateTime.Now;

            this._dataContext.Add(sp);
            await this._dataContext.SaveChangesAsync();

            return sp;
        }

        public async Task<List<SharedPrediction>> GetByPredictionIdAsync(Guid predictionId)
        {
            var sharedPredictions = await this._dataContext.SharedPredictions
                .AsNoTracking()
                .Where(p => p.PredictionId == predictionId)
                .ToListAsync();

            sharedPredictions = sharedPredictions.OrderByDescending(r => r.CreatedOn).ToList();
            return sharedPredictions;
        }
    }
}