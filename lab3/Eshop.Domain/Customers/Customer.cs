using Eshop.Domain.Customers.Events;
using Eshop.Domain.Customers.Rules;
using Eshop.Domain.SeedWork;

namespace Eshop.Domain.Customers;

public class Customer : Entity, IAggregateRoot
{
    public string Name { get; private set; }

    private Customer(Guid id, string name) : base(Guid.NewGuid())
    {
        Name = name ?? throw new ArgumentNullException(nameof(name));
        
        AddDomainEvent(new CustomerCreatedEvent(id, name));
    }
        
    public static Customer Create(Guid id, string name)
    {
        CheckRule(new CustomerNameCannotBeEmpty(name));
        CheckRule(new CustomerNameShouldContainsOnlyLetters(name));

        return new Customer(id, name);
    }
}