using System;

namespace backend.Models
{
   public class OpeningHour
{
    public long Id { get; set; }  // Primary Key
    public long PlaceId { get; set; }
    public string? Day { get; set; }  // nullable
    public TimeSpan OpenTime { get; set; }
    public TimeSpan CloseTime { get; set; }
    public Place? Place { get; set; }  // nullable
    public string? Status { get; set; }  // nullable
}
}