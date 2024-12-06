using Eshop.Application.Configuration.Commands;

namespace Eshop.Application.Customers.Commands;

public class CreateCustomerCommand(string name) : CommandBase<Guid>
{
    public string Name { get; } = name;
}