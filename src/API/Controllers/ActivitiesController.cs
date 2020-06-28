using System;
using System.Net;
using System.Threading;
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

        [HttpGet]
        public async Task<IActionResult> List(CancellationToken ct)
        {
            var activities = await _mediator.Send(new List.Query(), ct);
            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details([FromRoute] Guid id)
        {
            var activity = await _mediator.Send(new Details.Query() { Id = id });
            return Ok(activity);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Unit), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Create([FromBody] Create.Command command)
        {
            var unit = await _mediator.Send(command);
            return Ok(unit);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Unit), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] Edit.Command command)
        {
            command.Id = id;
            var unit = await _mediator.Send(command);
            return Ok(unit);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Unit), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Edit([FromRoute] Guid id)
        {
            var unit = await _mediator.Send(new Delete.Command
            {
                Id = id
            });
            return Ok(unit);
        }
    }
}