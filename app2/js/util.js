function successCallback(msg, $scope){
    $scope.data.tableParams.reload();
    $scope.notificacion = msg;
    $scope.success = true;
}

function errorCallback(msg, $scope){
    $scope.data.tableParams.reload();
    $scope.notificacion = msg;
    $scope.success = false;
}

function resetMsg($scope){
   $scope.notificacion = null;
   $scope.success = null;
}
