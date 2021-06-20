using System;
using Amazon.DynamoDBv2.DataModel;

namespace PredictionApi.Models
{
    [DynamoDBTable("Predictions")]
    public class Prediction
    {
        [DynamoDBRangeKey]
        public Guid Id { get; set; }
        [DynamoDBHashKey]
        public string UserId { get; set; }
        public string Name { get; set; }
        public Double Probability { get; set; }
        public DateTime RevisitOn { get; set; }
        public bool? IsTrue { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}