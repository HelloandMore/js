namespace Api.Controllers;

[ApiController]
public class RouteController(AppDbContext dbContext) : ControllerBase
{
	[HttpGet]
	[Route("/api/utak")]
	public async Task<ActionResult<List<RouteModel>>> GetAllAsync()
	{
		var result = await dbContext.Routes
			.AsNoTracking()
			.Select(r => new RouteModel(r))
			.ToListAsync();

		if (result.Count == 0)
			return NotFound("No routes found.");

		return Ok(result);
	}

	[HttpGet]
	[Route("/api/{id}/utak")]
	public async Task<ActionResult<RouteModel>> GetByIdAsync([FromRoute][Required] int id)
	{
		var entity = await dbContext.Routes.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
		if (entity == null)
			return NotFound($"Route with id '{id}' not found.");
		return new RouteModel(entity);
	}

	[HttpPost]
	[Route("/api/utak")]
	public async Task<ActionResult<RouteModel>> CreateAsync([FromBody][Required] RouteModel model)
	{
		bool exists = await dbContext.Routes.AnyAsync(x => x.Beginning == model.Beginning && x.Destination == model.Destination && x.Distance == model.Distance && x.StartedAt == model.StartedAt && x.EndedAt == model.EndedAt);
		if (exists)
			return Conflict("A route with the same departure/arrival and departure time already exists.");

		var entity = model.ToEntity();
		await dbContext.Routes.AddAsync(entity);
		await dbContext.SaveChangesAsync();

		return new RouteModel(entity);
	}

	[HttpPut]
	[Route("/api/{id}/utak")]
	public async Task<ActionResult<RouteModel>> UpdateAsync([FromBody][Required] RouteModel model, [FromRoute][Required] int id)
	{
		var entity = await dbContext.Routes.FirstOrDefaultAsync(x => x.Id == id);
		if (entity == null)
			return NotFound("Route not found.");

		entity.Beginning = model.Beginning;
		entity.Destination = model.Destination;
		entity.Distance = model.Distance;
		entity.StartedAt = model.StartedAt;
		entity.EndedAt = model.EndedAt;

		dbContext.Routes.Attach(entity);
		await dbContext.SaveChangesAsync();

		return new RouteModel(entity);
	}

	[HttpDelete]
	[Route("/api/{id}/utak")]
	public async Task<ActionResult> DeleteAsync([FromRoute][Required] int id)
	{
		var deleted = await dbContext.Routes.AsNoTracking().Where(x => x.Id == id).ExecuteDeleteAsync();
		if (deleted != 1)
			return Conflict("Error during delete");
		return Ok("Route deleted");
	}
}
