using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PredictionApi.Models
{
    public class CreateSharedPredictionRequest
    {
        public Guid PredictionId { get; set; }
        public double Probability { get; set; }
    }
}