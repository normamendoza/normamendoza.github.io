/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('formularioContactoCtrl', ['$scope', 'Shared','moment','contactoService',
    function ($scope, Shared, moment, contactoService) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */ 
        $scope.data = Shared;
        $scope.contacto = $scope.data.contacto;
        $scope.notificacion = $scope.data.notificacion;
        $scope.success = $scope.data.success;
        /**
         * Se encarga de agregar datos a la lista
         * @function
         */
        $scope.guardar = function () {
            var contacto = $scope.contacto;
            if (contacto.id == null){
               contactoService.guardar(contacto, function (response){
                 response.fechacreacion = moment(response.fechacreacion).format('DD/MM/YYYY HH:mm:ss');
                 angular.copy(response, $scope.contacto);
                 successCallback("Registro guardado con éxito", $scope)
               }, function(response){errorCallback("Ocurrió un error al guardar el registro", $scope)});
            }else {
                contactoService.actualizar($scope.contacto.id, $scope.contacto, function(response){
                    response.fechacreacion = moment(response.fechacreacion).format('DD/MM/YYYY HH:mm:ss');
                    angular.copy(response,$scope.contacto);
                    successCallback("Registro actualizado con éxito", $scope);
                }, function(response){errorCallback("Ocurrió un error al guardar el registro", $scope)});
            }
	    
        }
        $scope.eliminar = function (id) {
            contactoService.eliminar(id, function(data){
                successCallback("Registro eliminado con éxito", $scope)
                angular.copy({},$scope.contacto);
            }, function(response){errorCallback("Ocurrió un error al guardar el registro", $scope)}
        );
       }
       $scope.nuevo = function () {
           resetMsg($scope);
           angular.copy({},$scope.contacto);

       }
 }]);
