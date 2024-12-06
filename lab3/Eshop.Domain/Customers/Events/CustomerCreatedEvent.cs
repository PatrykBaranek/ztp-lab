using Eshop.Domain.SeedWork;

namespace Eshop.Domain.Customers.Events;

public class CustomerCreatedEvent(Guid customerId, string name) : DomainEventBase
{
    public Guid CustomerId { get; } = customerId;
    public string Name { get; } = name;
}