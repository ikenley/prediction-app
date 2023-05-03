using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PredictionApi.Models
{
    [Table("prediction", Schema = "prediction")]
    public class Prediction
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public Double Probability { get; set; }
        public DateTime RevisitOn { get; set; }
        public bool? IsTrue { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastUpdated { get; set; }

        public bool CanShare { get; set; }

        public List<SharedPrediction> SharedPredictions { get; set; } = new List<SharedPrediction>();
    }
}