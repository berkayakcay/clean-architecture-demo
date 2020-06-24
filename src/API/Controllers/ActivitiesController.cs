using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var activities = await _mediator.Send(new List.Query());
            return Ok(activities);
        }
    }
}