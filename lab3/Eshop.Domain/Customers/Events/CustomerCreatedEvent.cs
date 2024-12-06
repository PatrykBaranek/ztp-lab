using Eshop.Domain.SeedWork;

namespace Eshop.Domain.Customers.Events;

public class CustomerCreatedEvent(Guid customerId) : DomainEventBase
{
    public Guid CustomerId { get; } = customerId;
}