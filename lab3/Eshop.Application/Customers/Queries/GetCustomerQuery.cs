using MediatR;
using Eshop.Contracts.Shared;

namespace Eshop.Application.Customers.Queries;

public class GetCustomerQuery(Guid customerId) : IRequest<CustomerDto>
{
    public Guid CustomerId { get; } = customerId;
}