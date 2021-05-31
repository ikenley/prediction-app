
// using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
// using Microsoft.EntityFrameworkCore;

// namespace PredictionApi.Models
// {
//     /// <summary>
//     /// A Session containing filter selections
//     /// </summary>
//     [Index(nameof(UserId))]
//     public class Session
//     {
//         public Guid SessionId { get; set; }

//         [Column(TypeName = "varchar(50)")]
//         public string UserId { get; set; }

//         public DateTime DateCreated { get; set; }

//         public DateTime LastUpdated { get; set; }

//         public DateTime? DateDeleted { get; set; }

//         public static Session CreateDefault(string userId)
//         {
//             var session = new Session
//             {
//                 SessionId = Guid.NewGuid(),
//                 UserId = userId,
//                 DateCreated = DateTime.Now,
//                 LastUpdated = DateTime.Now,
//             };
//             return session;
//         }
//     }
// }