using System.Text.RegularExpressions;
using Eshop.Domain.SeedWork;

namespace Eshop.Domain.Customers.Rules;

public class CustomerNameCannotBeEmpty(string name) : IBusinessRule
{
    public bool IsBroken() => string.IsNullOrEmpty(name);

    public string Message => "Customer name cannot be empty";
}