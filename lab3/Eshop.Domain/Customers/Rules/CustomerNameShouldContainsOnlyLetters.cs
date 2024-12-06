using System.Text.RegularExpressions;
using Eshop.Domain.SeedWork;

namespace Eshop.Domain.Customers.Rules;

public class CustomerNameShouldContainsOnlyLetters(string name) : IBusinessRule
{
    public bool IsBroken() => !Regex.IsMatch(name, @"^[a-zA-Z]+$");

    public string Message => "Customer name should contain only letters";
}