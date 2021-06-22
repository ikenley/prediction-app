using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;

namespace PredictionApi.Models
{
    public class PredictionService : IPredictionService
    {
        private IAmazonDynamoDB _dynamoDBClient;

        private IUserService _userService;

        public PredictionService(IAmazonDynamoDB dynamoDBClient, IUserService userService)
        {
            _dynamoDBClient = dynamoDBClient;
            _userService = userService;
        }

        public async Task<Prediction> CreateAsync(string userId, Prediction prediction)
        {
            var p = new Prediction();
            p.Id = Guid.NewGuid();
            p.UserId = userId;
            p.Name = prediction.Name;
            p.Probability = prediction.Probability;
            p.RevisitOn = prediction.RevisitOn;
            p.IsTrue = null;
            p.Description = prediction.Description;
            p.CreatedOn = DateTime.Now;
            p.LastUpdated = DateTime.Now;

            var context = new DynamoDBContext(_dynamoDBClient);
            await context.SaveAsync(p);

            return p;
        }

        public async Task DeleteAsync(string userId, Guid id)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            await context.DeleteAsync<Prediction>(userId, id);
        }

        public async Task<Prediction> GetByIdAsync(string userId, Guid id)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            var prediction = await context.LoadAsync<Prediction>(userId, id);
            return prediction;
        }

        public async Task<List<Prediction>> GetByUserIdAsync(string userId)
        {
            var context = new DynamoDBContext(_dynamoDBClient);
            var predictions = await context.QueryAsync<Prediction>(userId).GetRemainingAsync();
            predictions = predictions.OrderByDescending(r => r.CreatedOn).ToList();
            return predictions;
        }

        public async Task<Prediction> UpdateAsync(string userId, Prediction prediction)
        {
            var old = await GetByIdAsync(userId, prediction.Id);

            old.Name = prediction.Name;
            old.Probability = prediction.Probability;
            old.RevisitOn = prediction.RevisitOn;
            old.IsTrue = prediction.IsTrue;
            old.Description = prediction.Description;
            old.LastUpdated = DateTime.Now;

            var context = new DynamoDBContext(_dynamoDBClient);
            await context.SaveAsync(old);

            return old;
        }
    }
}