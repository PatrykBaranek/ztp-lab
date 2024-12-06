namespace Eshop.Infrastructure.Exceptions;

public class CustomerNotExistsException(Guid id) : Exception($"Customer with ID '{id}' does not exist.")
{
    public Guid Id { get; } = id;
}