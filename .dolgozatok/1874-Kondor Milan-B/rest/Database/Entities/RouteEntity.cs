namespace Database.Entities;

[Table("MotorosUtak")]
public class RouteEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public string Beginning { get; set; } // A "From" név miatt nem működött az adatbázisba a beillesztés

    [Required]
    public string Destination { get; set; } // A "To" név miatt nem működött az adatbázisba a beillesztés

    [Required]
    public int Distance { get; set; }

    [Required]
    public DateTime StartedAt { get; set; }

    [Required]
    public DateTime EndedAt { get; set; }
}
