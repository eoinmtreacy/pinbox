namespace backend.Models
{
public class User_Preference
    {
        public int Id { get; set; }
        public string Location { get; set; } = string.Empty; 
        public int Radius { get; set; }
        public string TypeOfPlace { get; set; } = string.Empty; 
    }
}
