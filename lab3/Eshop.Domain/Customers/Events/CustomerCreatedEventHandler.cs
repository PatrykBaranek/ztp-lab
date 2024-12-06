using MediatR;

namespace Eshop.Domain.Customers.Events;

public class CustomerCreatedEventHandler : INotificationHandler<CustomerCreatedEvent>
{
    public Task Handle(CustomerCreatedEvent notification, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}