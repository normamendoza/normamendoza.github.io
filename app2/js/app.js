/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute', 'angularMoment','ngTable']);
// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/contactos', {
            templateUrl: 'views/lista-contacto-partial.html',
            controller: 'listaContactoCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */

app.factory('Shared', function () {
    return {
        list: [],
        contacto : {},
        notificacion : null,
        success : null
    };
});
