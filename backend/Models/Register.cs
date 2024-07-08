namespace backend.Models
{
    public class RegisterModel
    {
        required public string Email { get; set; }
        required public string Pinbox_Id { get; set; }
        required public string Password { get; set; }
    }
}