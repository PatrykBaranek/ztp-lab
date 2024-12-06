namespace Eshop.Contracts;

public class CustomerCreateRequest(string name)
{
    public string Name { get; } = name is null
        ? throw new ArgumentNullException(nameof(name), "Name cannot be null or empty.")
        : name;
}