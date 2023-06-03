using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PredictionApi.Models
{
    [Table("user", Schema = "iam")]
    public class User
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }

        public DateTime LastAccessed { get; set; }

        public User() { }

        public User(string id, string firstName, string lastName, string email)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Created = DateTime.Now;
            LastAccessed = DateTime.Now;
        }

    }
}