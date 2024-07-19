using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("predictions")]
    public class Prediction
    {
        public long location { get; set; }
        public DateTime datetime { get; set; }
        public int passenger_count { get; set; }
        public double percentile { get; set; }
    }   
}