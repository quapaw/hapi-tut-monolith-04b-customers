exports.register = function (server, options, next) {
    const Routes = require('./lib/CustomerRoutes');
    const routes = new Routes();

    server.route({method:  'GET',
                  path:    '/customers',
                  handler: routes.getAll
                 });

    server.route({method: 'GET',
                  path:   '/customers/{id}',
                  handler: routes.getByID
                 });

    server.route({method: 'POST',
                  path:   '/customers',
                  handler: routes.addCustomer
                 });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};