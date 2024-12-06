using Eshop.Domain.Customers;
using Eshop.Domain.SeedWork;
using MediatR;

namespace Eshop.Application.Customers.Commands;

public class CreateCustomerCommandHandler(ICustomerRepository customerRepository, IUnitOfWork unitOfWork) : IRequestHandler<CreateCustomerCommand, Guid>
{
    private readonly ICustomerRepository _customerRepository = customerRepository ?? throw new ArgumentNullException(nameof(customerRepository));
    private readonly IUnitOfWork _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));

    public async Task<Guid> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = Customer.Create(request.Id, request.Name);
        _customerRepository.Add(customer);

        await _unitOfWork.CommitAsync(cancellationToken);

        return customer.Id;
    }

}