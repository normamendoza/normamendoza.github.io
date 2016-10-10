/*
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios. 
 * Abarca las operaciones que pueden ser realizads sobre el recurso Persona.
 */
var REST_BASE = 'https://desa03.konecta.com.py/pwf/rest/';
app.service('contactoService', ['$http', function ($http) {
    return {
		/**
         * Realiza un get para obtener la lista de contactos
         * de anteproyecto.
         * @function
         */
        listar: function (params, success, error) {
            return $http.get(REST_BASE + 'agenda', {
                params: params
            }).success(function(data){
               success(data);
            }).error(function(data){
                error(data);
            });
        },


        /**
         * Realiza un GET para obtener el un contacto
         * de anteproyecto.
         * @function
         */
        obtener: function (id, success, error) {
            $http.get(REST_BASE + 'agenda/' + id).success(function(data){
               success(data);
            }).error(function(data){
                error(data);
            });
        },


        /**
         * Realiza un POST para persitir un contacto
         * @function
         * @param contacto
         * @config {string}nombre
         * @config {string}apellido
         * @config {string}alias
         * @config {string}direccion
         * @config {number}telefono
         * @config {string}email
         */
        guardar: function (contacto, success, error) {
            return $http.post(REST_BASE + 'agenda', contacto).success(function(data){
               success(data);
            }).error(function(data){
                error(data);
            });
        },


        /**
         * Realiza un PUT para actualizar un contacto
         * @function
         * @param id identificador del contacto
         * @param contacto
         * @config {string}nombre
         * @config {string}apellido
         * @config {string}alias
         * @config {string}direccion
         * @config {number}telefono
         * @config {string}email
         */
        actualizar: function (id, contacto, success, error) {
            $http.put(REST_BASE + 'agenda/' + id, contacto).success(function(data){
               success(data);
            }).error(function(data){
                error(data);
            });
        },


        /**
         * Realiza un DELETE para actualizar un contacto
         * @function
         * @param id identificador del contacto
         */
        eliminar: function (id, success, error) {
            return $http.delete(REST_BASE + 'agenda/' + id).success(function(data){
               success(data);
            }).error(function(data){
                error(data);
            });
        }

    }
}]);
