using AutoMapper;
using Eshop.Contracts.Shared;
using Eshop.Domain.Customers;
using MediatR;

namespace Eshop.Application.Customers.Queries;

public class GetCustomerQueryHandler(ICustomerRepository customerRepository, IMapper mapper)
    : IRequestHandler<GetCustomerQuery, CustomerDto>
{
    private readonly ICustomerRepository _customerRepository = customerRepository ?? throw new ArgumentNullException(nameof(customerRepository));
    private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

    public async Task<CustomerDto> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
    {
        var customer = await _customerRepository.GetByIdAsync(request.CustomerId);
        return _mapper.Map<CustomerDto>(customer);
    }
}