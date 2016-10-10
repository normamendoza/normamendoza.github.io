/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('listaContactoCtrl', ['$scope', 'contactoService', 'Shared', 'NgTableParams','$q','moment',

    function ($scope, contactoService, Shared, NgTableParams, $q, moment) {
        $scope.data = Shared;
        $scope.success = $scope.data.success;
        $scope.notificacion = $scope.data.notificacion;
        var lista = $scope.data.list;
        $scope.data.tableParams = new NgTableParams({}, {
            getData: function(params) {
                var filter = $scope.filter;
      			var count = params.count();
		        var page = params.page();
                var defered = $q.defer();  
                var promise = defered.promise; 
    			contactoService.listar({inicio:count*(page-1), cantidad:count, filtro: filter}, function(response) {
                                $scope.data.tableParams.total(response.total);
			        defered.resolve(response.lista);
        		});
        		return promise;
            }
        });
        $scope.tableParams = $scope.data.tableParams;
        $scope.editar = function (id){
            contactoService.obtener(id, function(respuesta){
                resetMsg($scope);
                respuesta.fechacreacion = moment(respuesta.fechacreacion).format('DD/MM/YYYY HH:mm:ss');
                angular.copy(respuesta,$scope.data.contacto);
            });
        }

        $scope.eliminar = function (id) {
            contactoService.eliminar(id, function(data){
                angular.copy({},$scope.contacto);
                successCallback("Registro eliminado con éxito", $scope);
            }, function(response){errorCallback("Ocurrió un error al guardar el registro", $scope)});
        }
        $scope.$watch("filter", function (value) {
            $scope.tableParams.reload();
            $scope.tableParams.page(1);
        });
    }
]);
