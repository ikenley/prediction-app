using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PredictionApi.Models;

namespace PredictionApi.Models
{
    public class PredictionService : IPredictionService
    {

        private readonly ISharedPredictionService _sharedPredictionService;
        private IUserService _userService;
        private readonly DataContext _dataContext;

        public PredictionService(
            DataContext dataContext,
            ISharedPredictionService sharedPredictionService,
            IUserService userService
        )
        {
            this._dataContext = dataContext;
            this._sharedPredictionService = sharedPredictionService;
            this._userService = userService;
        }

        public async Task<Prediction> CreateAsync(string userId, Prediction prediction)
        {
            var p = new Prediction();
            p.Id = Guid.NewGuid();
            p.UserId = userId;
            p.Name = prediction.Name;
            p.Probability = prediction.Probability;
            p.RevisitOn = prediction.RevisitOn.Date;
            p.IsTrue = null;
            p.Description = prediction.Description;
            p.CreatedOn = DateTime.Now;
            p.LastUpdated = DateTime.Now;

            this._dataContext.Add(p);
            await this._dataContext.SaveChangesAsync();

            return p;
        }

        public async Task<Prediction> GetByIdAsync(string userId, Guid id)
        {
            var prediction = await this._dataContext.Predictions.FindAsync(id);

            if (prediction.UserId != userId)
            {
                throw new UnauthorizedAccessException("Unauthorized access to prediction");
            }

            if (prediction.CanShare)
            {
                prediction.SharedPredictions = await this._sharedPredictionService.GetByPredictionIdAsync(prediction.Id);
            }

            return prediction;
        }

        public async Task<List<Prediction>> GetByUserIdAsync(string userId)
        {
            var predictions = await this._dataContext.Predictions
                .AsNoTracking()
                .Where(p => p.UserId == userId)
                .ToListAsync();

            predictions = predictions.OrderByDescending(r => r.CreatedOn).ToList();
            return predictions;
        }

        public async Task<Prediction> UpdateAsync(string userId, Prediction prediction)
        {
            var p = await GetByIdAsync(userId, prediction.Id);

            p.Name = prediction.Name;
            p.Probability = prediction.Probability;
            p.RevisitOn = prediction.RevisitOn.Date;
            p.IsTrue = prediction.IsTrue;
            p.Description = prediction.Description;
            p.LastUpdated = DateTime.Now;

            await this._dataContext.SaveChangesAsync();

            return p;
        }

        public async Task DeleteAsync(string userId, Guid id)
        {
            var prediction = await GetByIdAsync(userId, id);
            this._dataContext.Predictions.Remove(prediction);
            await this._dataContext.SaveChangesAsync();
        }
    }
}