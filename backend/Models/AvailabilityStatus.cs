using System.Runtime.Serialization;

namespace backend.Models
{
    public enum AvailabilityStatus
    {
        Yes,
        No,
        Unknown
    }
    public enum CategorySwipe
{
    [EnumMember(Value = "love_it")]
    LoveIt,
    [EnumMember(Value = "hate_it")]
    HateIt,
    [EnumMember(Value = "wanna")]
    Wanna,
    [EnumMember(Value = "dont_care")]
    DontCare
}

}
