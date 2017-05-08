'use strict';

const SampleCustomers = require('../samples/customers');


class CustomerRoutes {
    getAll(request, reply) {
        reply(SampleCustomers);
    };

    getByID(request, reply) {
        const customers = SampleCustomers.customers;
        const id = request.params.id;
        let found = null;

        customers.forEach( (customer) => {
            if (customer.id === id) {
                found = customer;
            }

        });

        reply(found);
    };

    addCustomer(request, reply) {
        let payload = request.payload;

        console.info('printing payload instead of actually inserting into a data store');
        console.info(JSON.stringify(payload));

        return reply(payload);  //Posts usually echo the object back out
    };
}
module.exports = CustomerRoutes;