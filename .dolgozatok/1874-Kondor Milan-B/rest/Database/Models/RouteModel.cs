namespace Database.Models;

public class RouteModel
{
    public RouteModel()
    {
    }

    public RouteModel(RouteEntity e)
    {
        Id = e.Id;
        Beginning = e.Beginning;
        Destination = e.Destination;
        Distance = e.Distance;
        StartedAt = e.StartedAt;
        EndedAt = e.EndedAt;
    }

    public int Id { get; set; }

    [Required]
    public string Beginning { get; set; }

    [Required]
    public string Destination { get; set; }

    [Required]
    public int Distance { get; set; }

    [Required]
    public DateTime StartedAt { get; set; }

    [Required]
    public DateTime EndedAt { get; set; }

    public RouteEntity ToEntity()
    {
        return new RouteEntity
        {
            Id = this.Id,
            Beginning = this.Beginning,
            Destination = this.Destination,
            Distance = this.Distance,
            StartedAt = this.StartedAt,
            EndedAt = this.EndedAt
        };
    }
}
