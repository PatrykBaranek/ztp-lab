using System.Net;
using Ardalis.GuardClauses;
using Eshop.Application.Customers.Commands;
using Eshop.Application.Customers.Queries;
using Eshop.Contracts;
using Eshop.Contracts.Shared;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.API.Controllers;

[ApiController]
[Route("api/v1/customers")]
public class CustomersController(ISender sender) : ControllerBase
{
    private readonly ISender _sender = Guard.Against.Null(sender, nameof(sender));

    [HttpPost]
    [ProducesResponseType(typeof(Guid), (int)HttpStatusCode.Created)]
    [ProducesResponseType(typeof(ErrorDto), (int)HttpStatusCode.BadRequest)]
    public async Task<IActionResult> CreateCustomer([FromBody] CustomerCreateRequest request, CancellationToken cancellationToken = default)
    {
        var customerId = await _sender.Send(new CreateCustomerCommand(request.Name), cancellationToken);
        return Created($"api/v1/customers/{customerId}", customerId);
    }

    [HttpGet("{customerId:guid}")]
    public async Task<IActionResult> GetCustomer([FromRoute] Guid customerId, CancellationToken cancellationToken = default)
    {
        var customer = await _sender.Send(new GetCustomerQuery(customerId), cancellationToken);
        return Ok(customer);
    }
}