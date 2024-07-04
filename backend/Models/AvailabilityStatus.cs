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
    [EnumMember(Value = "love it")]
    LoveIt,
    [EnumMember(Value = "hate it")]
    HateIt,
    [EnumMember(Value = "wanna")]
    Wanna,
    [EnumMember(Value = "don't care")]
    DontCare
}

}
