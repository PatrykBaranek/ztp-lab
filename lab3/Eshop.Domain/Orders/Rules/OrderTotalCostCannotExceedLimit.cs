using Eshop.Domain.SeedWork;

namespace Eshop.Domain.Orders.Rules;

public class OrderTotalCostCannotExceedLimit(IReadOnlyCollection<OrderProduct> orderProducts) : IBusinessRule
{
    private const decimal MaxTotalCost = 15000m;

    public bool IsBroken() => orderProducts.Sum(p => p.TotalCost) > MaxTotalCost;

    public string Message => "The total cost of the order cannot exceed 15000";
}