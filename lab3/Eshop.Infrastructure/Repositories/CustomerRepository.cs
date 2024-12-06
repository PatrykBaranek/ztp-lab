using Ardalis.GuardClauses;
using Eshop.Domain.Customers;
using Eshop.Infrastructure.Database;
using Eshop.Infrastructure.Exceptions;

namespace Eshop.Infrastructure.Repositories;

internal class CustomerRepository(OrdersContext context, IEntityTracker entityTracker) : ICustomerRepository
{
    private readonly OrdersContext _context = context ?? throw new ArgumentNullException(nameof(context));
    private readonly IEntityTracker _entityTracker = entityTracker ?? throw new ArgumentNullException(nameof(entityTracker));
    
    public void Add(Customer customer)
    {
        Guard.Against.Null(customer, nameof(customer), "Customer is required.");
        _entityTracker.Track(customer);
    }
    public Task<Customer> GetByIdAsync(Guid id)
    {
        var customer = _entityTracker.Find<Customer>(id);

        if (customer == null)
        {
            throw new CustomerNotExistsException(id);
        }
        _entityTracker.Track(customer);

        return Task.FromResult(customer);
    }
}