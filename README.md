# Breaking the Monolith by using hapi 
## Background
Let me get the disclaimer out of the way: I am not an expert on Hapi
I started looking into Hapi's ability to break components out.
This is my attempt to follow other tutorials from a hello world to a true component system.
I have broken this down into the following steps

| Project  | Description | Link |
|---|---|---|
|hapi-tut-monolith-01|A simple hello world hapi project| [01](https://github.com/quapaw/hapi-tut-monolith-01)|
|hapi-tut-monolith-02a|Add services - customers and products| [02A](https://github.com/quapaw/hapi-tut-monolith-02a)|
|hapi-tut-monolith-02b|Adding Glue and externalizing config| [02B](https://github.com/quapaw/hapi-tut-monolith-02b)|
|hapi-tut-monolith-02c|Moving services into their own folders| [02C](https://github.com/quapaw/hapi-tut-monolith-02c)|
|hapi-tut-monolith-03-main|Moved service into own project. Instructions here| [03-main](https://github.com/quapaw/hapi-tut-monolith-03-main)|
|hapi-tut-monolith-03-customer|Just the customer service| [03-customers](https://github.com/quapaw/hapi-tut-monolith-03-customers)|
|hapi-tut-monolith-03-products|Just the produce service| [03-products](https://github.com/quapaw/hapi-tut-monolith-03-products)|
|hapi-tut-monolith-04a-customer|Movement of some files| [04a-customers](https://github.com/quapaw/hapi-tut-monolith-04a-customers)|
|**hapi-tut-monolith-04b-customer**|**New methods**| **[04b-customers](https://github.com/quapaw/hapi-tut-monolith-04b-customers)**|
|hapi-tut-monolith-04c-customer|Validation and Error Handling|[04c-customers](https://github.com/quapaw/hapi-tut-monolith-04c-customers)|
|hapi-tut-monolith-04d-customer|Unit Testing|[04d-customers](https://github.com/quapaw/hapi-tut-monolith-04d-customers)|
|hapi-tut-monolith-04e-customer|Add Mongo and API Doc|[04e-customers](https://github.com/quapaw/hapi-tut-monolith-04e-customers)|
|hapi-tut-monolith-05-customer|Combine work with products for full deployment|[05-customers](https://github.com/quapaw/hapi-tut-monolith-05-customers)|
|hapi-tut-monolith-05-product|Combine work with products for full deployment|[05-products](https://github.com/quapaw/hapi-tut-monolith-05-product)|
|hapi-tut-monolith-05-main|Combine work with products for full deployment|[05-main](https://github.com/quapaw/hapi-tut-monolith-05-main)|


#HAPI Tutorial - Monolith - 4 - Move toward production
This part of the tutorial will move the customer plugin more toward a production plugin.
This step, 04b, will add two more methods.
## Add getByID as a method
* Add method in CustomerRoutes.js

```javascript
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
```


    
* Add route definition to index.js
    
```javascript
    server.route({method: 'GET',
                  path:   '/customers/{id}',
                  handler: routes.getByID
                 });
```
    
* Test by running ```node localServer.js``` and hitting url (http://localhost:3000/customers/123)

## Add addCustomer as a method
* Add method in CustomerRoutes.js

```javascript
    addCustomer(request, reply) {
        let payload = request.payload;

        console.info('printing payload instead of actually inserting into a data store');
        console.info(JSON.stringify(payload));

        return reply(payload);  //Posts usually echo the object back out
    };
```

* add route definition to index.js

```javascript
    server.route({method: 'POST',
                  path:   '/customers',
                  handler: routes.addCustomer
                 });

```

* Test by running this by starting your server ```node localServer.js``` and then running curl command below 

```
curl -X POST \
  http://localhost:3000/customers \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: a51db850-0c65-ef43-1665-6a9daadb08a1' \
  -d '  {
      "id": "126",
      "first":  "Rich",
      "middle": "H",
      "last":   "Father",
      "addressLine": "9 S. Ninth Street",
      "city":        "Little Rock",
      "state":       "AR",
      "postalCode":  "72206"
    }'
```