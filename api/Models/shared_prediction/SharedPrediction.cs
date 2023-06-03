using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PredictionApi.Models
{
    [Table("shared_prediction", Schema = "prediction")]
    public class SharedPrediction
    {
        public Guid PredictionId { get; set; }
        public string UserId { get; set; }
        public double Probability { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastUpdated { get; set; }

        public User User {get;set;}

        public SharedPrediction() { }
    }
}