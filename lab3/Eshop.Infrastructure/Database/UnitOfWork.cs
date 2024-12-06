using Ardalis.GuardClauses;
using Eshop.Domain.Customers;
using Eshop.Domain.Orders;
using Eshop.Domain.SeedWork;
using MongoDB.Driver;

namespace Eshop.Infrastructure.Database;

internal sealed class UnitOfWork(
    OrdersContext ordersContext,
    IEntityTracker entityTracker,
    IDomainEventsDispatcher domainEventsDispatcher)
    : IUnitOfWork
{
    private readonly OrdersContext _ordersContext = Guard.Against.Null(ordersContext, nameof(ordersContext));
    private readonly IEntityTracker _entityTracker = Guard.Against.Null(entityTracker, nameof(entityTracker));
    private readonly IDomainEventsDispatcher _domainEventsDispatcher = Guard.Against.Null(domainEventsDispatcher, nameof(domainEventsDispatcher));
    
    public async Task CommitAsync(CancellationToken cancellationToken = default)
    {
        var trackedEntities = _entityTracker.Get();

        try
        {
            if (trackedEntities.Any())
            {
                await _domainEventsDispatcher.DispatchEventsAsync(trackedEntities);
            }
            
            foreach (var entity in trackedEntities)
            {
                switch (entity)
                {
                    case Order order:
                    {
                        var filter = Builders<Order>.Filter.Eq(c => c.Id, order.Id);
                        await _ordersContext.Orders.ReplaceOneAsync(
                            filter, 
                            order, 
                            new ReplaceOptions { IsUpsert = true }, 
                            cancellationToken);
                        break;
                    }
                    case Customer customer:
                    {
                        var filter = Builders<Customer>.Filter.Eq(c => c.Id, customer.Id);
                        await _ordersContext.Customers.ReplaceOneAsync(
                            filter, 
                            customer, 
                            new ReplaceOptions { IsUpsert = true }, 
                            cancellationToken);
                        break;
                    }
                    default:
                        throw new InvalidOperationException($"Entity of type {entity.GetType().Name} is not supported.");
                }
            }
        }
        finally
        {
            _entityTracker.Clear();
        }
    }
}